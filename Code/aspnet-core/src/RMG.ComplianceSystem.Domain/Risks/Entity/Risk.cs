using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Risks.Entity
{
    public class Risk : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public int Level { get; set; }

    }
    public enum LevelRisk
    {
        Low,medium,high
    }
}
