using System;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public class InternalAuditApprovePagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public Boolean? IsApprove { get; set; }
        public DateTime? approveDate { get; set; }
        public Guid? ApproveBy { get; set; }
    }
    
}
