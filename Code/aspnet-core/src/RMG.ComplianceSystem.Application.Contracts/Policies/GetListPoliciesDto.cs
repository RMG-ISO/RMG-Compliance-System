using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class GetListPoliciesDto : PagedAndSortedResultRequestDto
    {
        public PolicyStatus? Status { get; set; }
        public PolicyType? Type { get; set; }
    }
}
