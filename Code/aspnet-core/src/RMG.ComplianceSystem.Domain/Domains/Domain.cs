using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Domains
{
    public class Domain : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public string DescriptionAr { get; set; }
        public string DescriptionEn { get; set; }
        public string Reference { get; set; }
        public SharedStatus Status { get; set; }
        public Guid? ParentId { get; set; }
        public Guid FrameworkId { get; set; }

        public virtual Framework Framework { get; set; }
        public virtual Domain Parent { get; set; }
        public virtual ICollection<Domain> Children { get; set; }
        public virtual ICollection<Control> Controls { get; set; }
        public virtual ICollection<DomainDepartment> DomainDepartments { get; set; }



        protected Domain()
        {
        }

        public Domain(
            Guid id,
            string nameAr,
            string nameEn,
            string descriptionAr,
            string descriptionEn,
            string reference,
            SharedStatus status,
            Guid? parentId,
            Guid frameworkId
        ) : base(id)
        {
            NameAr = nameAr;
            NameEn = nameEn;
            DescriptionAr = descriptionAr;
            DescriptionEn = descriptionEn;
            Reference = reference;
            Status = status;
            ParentId = parentId;
            FrameworkId = frameworkId;
        }

        public void AddDomainDepartment(DomainDepartment entity)
        {
            if (DomainDepartments is null)
                DomainDepartments = new List<DomainDepartment>();
            DomainDepartments.Add(entity);
        }
    }
}
