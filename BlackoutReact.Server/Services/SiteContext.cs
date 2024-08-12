using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using BlackoutReact.Server.Models;

namespace BlackoutReact.Server.Services
{
    public class SiteContext : IdentityDbContext<User, IdentityRole<int>,int>
    {
        public SiteContext(DbContextOptions<SiteContext> options) : base(options) { }
        public virtual DbSet<Group> Groups { get; set; }
    }
}
