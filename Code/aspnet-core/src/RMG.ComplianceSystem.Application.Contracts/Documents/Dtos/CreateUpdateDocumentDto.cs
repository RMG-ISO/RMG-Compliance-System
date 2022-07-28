using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    [Serializable]
    public class CreateUpdateDocumentDto
    {

        [Required]
        [StringLength(128)]
        public string TitleAr { get; set; }
        [Required]
        [StringLength(128)]
        public string TitleEn { get; set; }

        public Guid CategoryId { get; set; }
        public Guid AttachmentId { get; set; }
    }
}
