using JetBrains.Annotations;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class CreatePolicyDto : EntityDto
    {
        [NotNull]
        public string NameEn { get; set; }
        [NotNull]
        public string NameAr { get; set; }
        public string Description { get; set; }
        public PolicyType Type { get; set; }
        public IList<Guid> OwnersIds { get; set; }
        public IList<Guid> ReviewersIds { get; set; }
        public IList<Guid> ApproversIds { get; set; }
        [Required]
        public IList<Guid> CategoryIds { get; set; }

        [JsonIgnore]
        public IList<Guid> EmployeesIds { get { return this.OwnersIds.Concat(this.ReviewersIds).Concat(this.ApproversIds).ToList(); }  }

    }
}
