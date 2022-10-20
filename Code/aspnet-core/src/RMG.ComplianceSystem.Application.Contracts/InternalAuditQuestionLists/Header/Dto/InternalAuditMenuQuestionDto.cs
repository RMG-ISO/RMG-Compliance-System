using RMG.ComplianceSystem.Frameworks.Dtos;
using RMG.ComplianceSystem.InternalAuditQuestions;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists.Header.Dto
{

    [Serializable]
    public class InternalAuditMenuQuestionDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string MenuTextEn { get; set; }
        public string MenuTextAr { get; set; }
        public bool IsEditable { get; set; }
        public Guid FrameworkId { get; set; }
        public virtual FrameworkDto Framework { get; set; }
        public List<InternalAuditQuestionDto> InternalAuditQuestions { get; set; }

    }
   
}
