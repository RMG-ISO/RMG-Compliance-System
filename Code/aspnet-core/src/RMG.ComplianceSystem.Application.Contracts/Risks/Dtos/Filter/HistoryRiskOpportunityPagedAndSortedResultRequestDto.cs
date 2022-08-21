using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    public class HistoryRiskOpportunityPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public int? WorkFlowStages { get; set; }
        public Guid? RiskOpportunityId { get; set; }
        public Guid? UserId { get; set; }
        
    }
}
