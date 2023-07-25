using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Documents
{
    public class Category : FullAuditedEntity<Guid>
    {
        public string Name { get; set; }

    }
}
