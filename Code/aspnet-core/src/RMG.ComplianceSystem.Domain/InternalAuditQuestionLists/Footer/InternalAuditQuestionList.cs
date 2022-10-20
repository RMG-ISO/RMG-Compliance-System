using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.InternalAuditQuestions;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.InternalAuditQuestionLists
{
    public class InternalAuditQuestionList : FullAuditedAggregateRootWithUser<Guid, Volo.Abp.Identity.IdentityUser>
    {
        public Guid InternalAuditMenuQuestionId { get; set; }
        public Guid InternalAuditQuestionId { get; set; }


        public override object[] GetKeys()
        {
            return new object[] { InternalAuditQuestionId, InternalAuditMenuQuestionId };
        }



        protected InternalAuditQuestionList()
        {
        }

        public InternalAuditQuestionList(
            Guid internalAuditQuestionId,
            Guid internalAuditMenuQuestionId
        )
        {
            InternalAuditQuestionId = internalAuditQuestionId;
            InternalAuditMenuQuestionId = internalAuditMenuQuestionId;
        }
    }
}
