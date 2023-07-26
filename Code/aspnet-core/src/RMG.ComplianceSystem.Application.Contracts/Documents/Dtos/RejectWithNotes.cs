using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class RejectWithNotes
    {
        [Required]
        public string Notes { get; set; }
    }
}
