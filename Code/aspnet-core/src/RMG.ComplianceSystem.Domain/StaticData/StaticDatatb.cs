using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.StaticData
{
    public class StaticDatatb : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        //TypeStaticData (Enum)
        public int Type { get; set; }
        public Guid TenantId { get; set; }  
        

    }
}
