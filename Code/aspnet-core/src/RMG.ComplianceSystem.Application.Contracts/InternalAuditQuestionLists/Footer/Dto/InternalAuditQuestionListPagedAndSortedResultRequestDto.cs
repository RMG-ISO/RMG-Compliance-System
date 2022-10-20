using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto
{

    [Serializable]
    public class InternalAuditQuestionListPagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public Guid? InternalAuditMenuQuestionId { get; set; }
        public Guid? InternalAuditQuestionId { get; set; }


    }
}
