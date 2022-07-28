using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    [Serializable]
    public class CreateUpdateDocumentCategoryDto
    {

        [Required]
        [StringLength(128)]
        public string NameAr { get; set; }
        [Required]
        [StringLength(128)]
        public string NameEn { get; set; }
        public Guid TenantId { get; set; }
    }
}
