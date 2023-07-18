using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class UpdatePolicyDto : EntityDto<Guid>
    {
        [Required]
        public string Name { get; set; }
        public PolicyType Type { get; set; }
        public IList<Guid> OwnersIds { get; set; }
        public IList<Guid> ReviewersIds { get; set; }
        public IList<Guid> ApproversIds { get; set; }

        public DateTime ValidationStartDate { get; set; }
        public DateTime ValidationEndtDate { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
