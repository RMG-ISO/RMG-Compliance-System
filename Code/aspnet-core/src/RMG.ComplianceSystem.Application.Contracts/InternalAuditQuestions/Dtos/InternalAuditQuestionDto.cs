using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Frameworks.Dtos;

namespace RMG.ComplianceSystem.InternalAuditQuestions
{
    [Serializable]
    public class InternalAuditQuestionDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string QuestionTextEn { get; set; }
        public string QuestionTextAr { get; set; }
        public string QuestionExplainEn { get; set; }
        public string QuestionExplainAr { get; set; }
        public bool Selected { get; set; }
        public Guid FrameworkId { get; set; }
        public bool CanDelete { get; set; }
        public virtual FrameworkDto Framework { get; set; }
    }
}
