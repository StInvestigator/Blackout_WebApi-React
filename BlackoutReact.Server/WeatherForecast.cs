namespace BlackoutReact.Server
{
    public class WeatherForecast
    {
        public DateOnly Date { get; set; }

        public int TemperatureC { get; set; }

        public decimal TemperatureF => 32 + (decimal)(TemperatureC / 0.5556);

        public string? Summary { get; set; }
    }
}
