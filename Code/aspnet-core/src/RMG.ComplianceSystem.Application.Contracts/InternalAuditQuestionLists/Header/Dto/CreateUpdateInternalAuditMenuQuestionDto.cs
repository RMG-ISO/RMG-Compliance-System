using RMG.ComplianceSystem.InternalAuditQuestionLists.Footer.Dto;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto
{
    [Serializable]
    public class CreateUpdateInternalAuditMenuQuestionDto
    {
        public string MenuTextEn { get; set; }
        public string MenuTextAr { get; set; }
        public bool IsEditable { get; set; }
        public Guid FrameworkId { get; set; }
        public List<Guid> QuestionsIds { get; set; }
    }
}
