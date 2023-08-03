using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class UpdatePrincipleComplianceDto
    {
        [Required]
        public Guid PrincipleId { get; set; }
        [Required]
        public PrincipleStatus Status { get; set; }
        public string Comment { get; set; }
        [Range(0, 100)]
        public int Score { get; set; }
        public Guid? AttachmentId { get; set; }
    }
}
