using RMG.ComplianceSystem.Common.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class PrincipleComplianceDataFilledEmailDto : EmailDto
    {
        public DateTime ScheduledStartDate { get; set; }
        public string PrincipleName { get; set; }
    }
}
