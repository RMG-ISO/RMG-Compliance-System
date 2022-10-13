using System;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    public class RiskOpportunityPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public int? Type { get; set; }
        public int? Potential { get; set; }
        public int? ReEvaluation { get; set; }
        public int? PotentialValue { get; set; }
        public int? Status { get; set; }
        public Guid? UserId { get; set; }
        public Guid? DepartmentId { get; set; }
    }
    
}
