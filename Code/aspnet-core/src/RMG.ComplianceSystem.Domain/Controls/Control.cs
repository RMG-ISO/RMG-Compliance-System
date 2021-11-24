using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Controls
{
    public class Control : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public string DescriptionAr { get; set; }
        public string DescriptionEn { get; set; }
        public string Reference { get; set; }
        public SharedStatus Status { get; set; }
        public Guid? ParentId { get; set; }
        public Guid DomainId { get; set; }

        public virtual Domain Domain { get; set; }
        public virtual Control Parent { get; set; }
        public virtual ICollection<Control> Children { get; set; }
        public virtual ICollection<Assessment> Assessments { get; set; }

        protected Control()
        {
        }

        public Control(
            Guid id,
            string nameAr,
            string nameEn,
            string descriptionAr,
            string descriptionEn,
            string reference,
            SharedStatus status,
            Guid? parentId,
            Guid domainId
        ) : base(id)
        {
            NameAr = nameAr;
            NameEn = nameEn;
            DescriptionAr = descriptionAr;
            DescriptionEn = descriptionEn;
            Reference = reference;
            Status = status;
            ParentId = parentId;
            DomainId = domainId;
        }
    }
}
