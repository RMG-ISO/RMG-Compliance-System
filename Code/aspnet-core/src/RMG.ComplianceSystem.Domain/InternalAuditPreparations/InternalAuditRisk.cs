using System;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.InternalAuditPreparations
{
    public class InternalAuditRisk: FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Guid RiskOpportunityId { get; set; }
        public Guid InternalAuditPreparationId { get; set; }




        protected InternalAuditRisk()
        {
        }

        public InternalAuditRisk(
            Guid riskOpportunityId,
            Guid internalAuditPreparationId
        )
        {
            RiskOpportunityId = riskOpportunityId;
            InternalAuditPreparationId = internalAuditPreparationId;

        }



    }
}
