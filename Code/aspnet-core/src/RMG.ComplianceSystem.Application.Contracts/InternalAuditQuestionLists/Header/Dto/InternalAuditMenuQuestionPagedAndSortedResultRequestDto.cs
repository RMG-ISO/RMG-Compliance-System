using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto
{

    [Serializable]
    public class InternalAuditMenuQuestionPagedAndSortedResultRequestDto:PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }
        public Guid FrameworkId { get; set; }


    }
}
