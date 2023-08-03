using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class SendPrinciplesForComplianceDto
    {
        [Required]
        public Guid DocumentId { get; set; }
        [Required]
        public Guid ResponsibleId { get; set; }
        [Required]
        public DateTime ScheduledStartDate { get; set; }
        [Required]
        public DateTime ScheduledEndDate { get; set; }
    }
}
