using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentWorkflowActionByUserEmailDto : DocumentStepAHeadWorkflowEmailDto
    {
        public string ActionByName { get; set; }
    }
}
