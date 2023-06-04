using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Domains.Dtos
{
    [Serializable]
    public class DomainDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public string Reference { get; set; }

        public SharedStatus Status { get; set; }
        public ComplianceStatus ComplianceStatus { get; set; }
        public DateTime? InternalAssessmentStartDate { get; set; }
        public DateTime? InternalAssessmentEndDate { get; set; }
        public DateTime? SelfAssessmentStartDate { get; set; }
        public DateTime? SelfAssessmentEndDate { get; set; }
        public DateTime? ReviewStartDate { get; set; }
        public DateTime? ReviewEndDate { get; set; }
        public Guid? ParentId { get; set; }

        public Guid FrameworkId { get; set; }
        public Guid? ResponsibleId { get; set; }
        public string ResponsibleName { get; set; }

        public List<NameId<Guid>> Departments { get; set; }
    }
}