using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    public class RiskOpportunityPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public int? Type { get; set; }
    }
    
}
