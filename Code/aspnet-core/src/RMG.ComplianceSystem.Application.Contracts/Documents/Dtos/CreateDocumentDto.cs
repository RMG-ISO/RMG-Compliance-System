using JetBrains.Annotations;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class CreateDocumentDto
    {
        [NotNull]
        public string Name { get; set; }
        public string Description { get; set; }
        public DocumentType Type { get; set; }
        public IList<Guid> OwnersIds { get; set; }
        public IList<Guid> OptionalReviewersIds { get; set; }
        public IList<Guid> RequiredReviewersIds { get; set; }
        public IList<Guid> OptionalApproversIds { get; set; }
        public IList<Guid> RequiredApproversIds { get; set; }
        public DateTime ValidationStartDate { get; set; }
        [Required]
        public DateTime ValidationEndtDate { get; set; }
        [Required]
        public IList<Guid> CategoriesIds { get; set; }

        [JsonIgnore]
        public IList<Guid> EmployeesIds
        {
            get
            {
                return OwnersIds.Concat(RequiredReviewersIds)
                    .Concat(RequiredApproversIds).ToList()
                    .Concat(OptionalApproversIds).ToList()
                    .Concat(OptionalReviewersIds).ToList();
            }
        }

    }
}
