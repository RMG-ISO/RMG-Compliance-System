using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class CreateUpdatePrincipleDto
    {
        [Required]
        public Guid DocumentId { get; set; }
        [Required]
        public string Name { get; set; }
        public string Description { get; set; }
        [Required]
        [MinLength(1)]
        public List<Guid> Controls { get; set; } = new List<Guid>();
    }
}