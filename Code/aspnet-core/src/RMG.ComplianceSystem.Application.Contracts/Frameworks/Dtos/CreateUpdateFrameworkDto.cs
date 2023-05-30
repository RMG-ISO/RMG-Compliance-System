using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class CreateUpdateFrameworkDto
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string ShortcutAr { get; set; }

        public string ShortcutEn { get; set; }

        public string DescriptionAr { get; set; }
        public string DescriptionEn { get; set; }
        public Guid ManagementId { get; set; }
        public Guid OwnerId { get; set; }
        public Guid AttachmentId { get; set; }
        public Guid ReviewUserId { get; set; }
        public Guid ApproveUserId { get; set; }
        public string LevelFirstNameAr { get; set; }
        public string LevelFirstNameEn { get; set; }

        public string LevelSecondNameAr { get; set; }
        public string LevelSecondNameEn { get; set; }

        public string LevelThirdNameAr { get; set; }
        public string LevelThirdNameEn { get; set; }

        public string LevelFourNameAr { get; set; }
        public string LevelFourNameEn { get; set; }

        public List<FrameworkEmpDto> FrameworkEmpsDto { get; set; }

    }

   
}