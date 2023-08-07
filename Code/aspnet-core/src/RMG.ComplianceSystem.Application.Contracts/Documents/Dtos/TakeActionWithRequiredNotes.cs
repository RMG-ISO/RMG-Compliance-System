using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class TakeActionWithRequiredNotes
    {
        [Required]
        public string Notes { get; set; }
        public string Role { get; set; }
    }
}
