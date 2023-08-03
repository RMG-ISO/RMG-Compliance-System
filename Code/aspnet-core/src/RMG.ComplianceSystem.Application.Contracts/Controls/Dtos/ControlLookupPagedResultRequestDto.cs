using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Controls.Dtos
{
    public class ControlLookupPagedResultRequestDto
    {
        public int MaxResultCount { get; set; } = int.MaxValue;
        public int SkipCount { get; set; } = 0;
        public string Search { get; set; }
    }
}
