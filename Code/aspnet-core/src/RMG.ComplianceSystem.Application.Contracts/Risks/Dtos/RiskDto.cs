using RMG.ComplianceSystem.Attachments.Dtos;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    [Serializable]
    public class RiskDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        // DocumentId 
        public Guid Id { get; set; }
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public int Level { get; set; }
        public string LevelName { get; set; }

    }

  

}      