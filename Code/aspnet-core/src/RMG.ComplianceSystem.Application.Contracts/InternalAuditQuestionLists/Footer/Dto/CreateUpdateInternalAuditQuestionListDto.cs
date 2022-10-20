using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto
{
    [Serializable]
    public class CreateUpdateInternalAuditQuestionListDto
    {
        public Guid InternalAuditMenuQuestionId { get; set; }
        public Guid InternalAuditQuestionId { get; set; }
    }
}
