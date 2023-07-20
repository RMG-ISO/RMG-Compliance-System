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
        public string NameEn { get; set; }
        [Required]
        public string NameAr { get; set; }
        public PolicyType Type { get; set; }
        public IList<Guid> OwnersIds { get; set; }
        public IList<Guid> ReviewersIds { get; set; }
        public IList<Guid> ApproversIds { get; set; }
        [Required]
        public DateTime ValidationStartDate { get; set; }
        [Required]
        public DateTime ValidationEndtDate { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
