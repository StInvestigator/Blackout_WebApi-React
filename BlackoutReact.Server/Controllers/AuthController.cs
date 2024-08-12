using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Runtime.CompilerServices;
using System.Security.Claims;
using System.Text;
using BlackoutReact.Server.Models;
using BlackoutReact.Server.Services;
using static System.Runtime.InteropServices.JavaScript.JSType;
using BlackoutReact.Server.Models.Responses;
using System.Net.Mail;

namespace WebAPI1.Controllers
{
    [ApiController]
    [Route("/api/v1/auth")]
    public class AuthController (UserManager<User> _userManager) : ControllerBase
    {
        private string GenerateJwtToken(User user)
        {
            var jwtHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("super-ultra-mega-sigma-greatest-secret-code");
            var jwtDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            }),
                //Expires = DateTime.Now.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature),

            };
            var token = jwtHandler.CreateToken(jwtDescriptor);
            var jwtToken = jwtHandler.WriteToken(token);
            return jwtToken;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ApiResponse<AuthResult>> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (!ModelState.IsValid || request.Email == "" || request.Password == "")
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Поганий запит");
                }

                if (await _userManager.FindByEmailAsync(request.Email) != null)
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Користувач з поштою " + request.Email + " вже істнує");
                }

                try
                {
                    MailAddress m = new MailAddress(request.Email);
                }
                catch (FormatException)
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Неправильна електронна адреса");
                }

                var user = new User
                {
                    Email = request.Email,
                    UserName = request.Email,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, request.Password);
                if (!result.Succeeded)
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Помилка при створенні куристувача");
                }

                return ApiResponse<AuthResult>.SuccessResponse(new AuthResult { Token = GenerateJwtToken(user) });
            }
            catch(Exception ex)
            {
                Response.StatusCode = 404;
                return ApiResponse<AuthResult>.ErrorResponse(ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<ApiResponse<AuthResult>> Login([FromBody] LoginRequest request)
        {
            try
            {
                if (!ModelState.IsValid || request.Email == "" || request.Password == "")
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Invalid Request");
                }

                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Користувача з поштою " + request.Email + " не істнує");
                }
                if (!await _userManager.CheckPasswordAsync(user, request.Password))
                {
                    Response.StatusCode = 400;
                    return ApiResponse<AuthResult>.ErrorResponse("Невірний пароль");
                }
                return ApiResponse<AuthResult>.SuccessResponse(new AuthResult { Token = GenerateJwtToken(user) });
            }
            catch (Exception ex)
            {
                Response.StatusCode = 404;
                return ApiResponse<AuthResult>.ErrorResponse(ex.Message);
            }
        }
    }
}
