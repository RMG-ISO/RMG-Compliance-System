using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Policies
{
    public class PoliciesCategories : FullAuditedEntity<Guid>
    {
        public Guid PolicyId { get; set; }
        public Guid PolicyCategoryId { get; set; }

        public virtual Policy Policy { get; set; }
        public virtual Category PolicyCategory { get; set; }
        public override object[] GetKeys()
        {
            return new object[] { PolicyId,  PolicyCategoryId};
        }
    }
}
