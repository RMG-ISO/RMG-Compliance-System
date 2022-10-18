using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    [Serializable]
    public class CreateUpdateInternalAuditQuestionDto
    {
        public string QuestionTextEn { get; set; }
        public string QuestionTextAr { get; set; }
        public Guid FrameworkId { get; set; }
    }
}
