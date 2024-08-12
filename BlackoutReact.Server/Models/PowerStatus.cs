﻿using BlackoutReact.Server.Models;
using System.Text.Json.Serialization;

namespace BlackoutReact.Server.Models
{

    public enum PowerState
    {
        Off, On, Maybe
    }
    public class PowerStatus
    {
        public int Id {  get; set; }
        public DateOnly Date {  get; set; }
        public int Hour { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public PowerState State { get; set; }
    }
}
