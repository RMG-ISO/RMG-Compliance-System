using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Domains.Dtos
{
    [Serializable]
    public class DomainWithoutPagingDto : DomainDto
    {
        public List<ControlDto> Controls { get; set; }
        public int ControlsCount { get; set; }
    }
}