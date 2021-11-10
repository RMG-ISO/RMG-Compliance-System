using RMG.ComplianceSystem.Shared;
using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Domains.Dtos
{
    [Serializable]
    public class CreateUpdateDomainDto
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public string Reference { get; set; }

        public SharedStatus Status { get; set; }

        public Guid? ParentId { get; set; }

        public Guid FrameworkId { get; set; }

        public Guid? DepartmentId { get; set; }
    }
}