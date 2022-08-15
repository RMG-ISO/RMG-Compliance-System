using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.RiskTreatments.Dtos
{
    public class RiskTreatmentPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Guid? RiskOpportunityId { get; set; }
    }
}
