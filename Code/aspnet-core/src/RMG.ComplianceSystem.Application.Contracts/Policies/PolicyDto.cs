using JetBrains.Annotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class PolicyDto : FullAuditedEntityDto<Guid>
    {
        [NotNull]
        public string Code { get; set; }
        [NotNull]
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public PolicyType Type { get; set; }
        public IList<Guid> OwnersIds { get; set; }
        public IList<Guid> ReviewersIds { get; set; }
        public IList<Guid> ApproversIds { get; set; }

        public DateTime ValidationStartDate { get; set; }
        public DateTime ValidationEndtDate { get; set; }


        [Range(0, 100)]
        public int CompliancePercentage { get; set; }
        public PolicyStatus Status { get; set; }
        [NotNull]
        public string Description { get; set; }


        public IList<Guid> CategoryIds { get; set; }
    }
}
