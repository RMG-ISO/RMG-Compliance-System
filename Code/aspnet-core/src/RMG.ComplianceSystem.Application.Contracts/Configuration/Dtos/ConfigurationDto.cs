using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Configuration.Dtos
{
    public class ConfigurationDto
    {
        public string Name { get; set; }
        public string DisplayName { get; set; }
        public string Value { get; set; }

        public ConfigurationDto(string name, string value, string displayName = null)
        {
            Name = name;
            DisplayName = displayName; 
            Value = value;
        }
    }
}
