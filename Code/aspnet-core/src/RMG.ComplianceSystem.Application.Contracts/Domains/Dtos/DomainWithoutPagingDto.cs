using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Domains.Dtos
{
    [Serializable]
    public class DomainWithoutPagingDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public string Reference { get; set; }

        public SharedStatus Status { get; set; }

        public Guid? ParentId { get; set; }

        public Guid FrameworkId { get; set; }
        public Guid? ResponsibleId { get; set; }
        public string ResponsibleName { get; set; }
        public List<NameId<Guid>> Departments { get; set; }

        public List<ControlDto> Controls { get; set; }
    }
}