using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks
{
    public class Framework : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {

        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public string ShortcutAr { get; set; }
        public string ShortcutEn { get; set; }
        public string DescriptionAr { get; set; }
        public string DescriptionEn { get; set; }
        public SharedStatus Status { get; set; }

        public virtual ICollection<Domain> Domains { get; set; }

        protected Framework()
        {
        }

        public Framework(
            Guid id,
            string nameAr,
            string nameEn,
            string shortcutAr,
            string shortcutEn,
            string descriptionAr,
            string descriptionEn,
            SharedStatus status
        ) : base(id)
        {
            NameAr = nameAr;
            NameEn = nameEn;
            ShortcutAr = shortcutAr;
            ShortcutEn = shortcutEn;
            DescriptionAr = descriptionAr;
            DescriptionEn = descriptionEn;
            Status = status;
        }
    }
}
