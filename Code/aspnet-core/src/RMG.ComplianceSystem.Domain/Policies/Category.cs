using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Policies
{
    public class Category : FullAuditedEntity<Guid>
    {
        public string NameEn { get; set; }
        public string NameAr { get; set; }

        public virtual ICollection<Policy> Policies { get; set; }
    }
}
