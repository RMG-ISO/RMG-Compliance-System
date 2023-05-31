using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Assessments
{
    public class AssessmentVersion : CreationAuditedEntityWithUser<Guid, IdentityUser>
    {
        public Guid AssessmentId { get; set; }
        public ApplicableType? Applicable { get; set; }
        public ComplianceLevelType? ComplianceLevel { get; set; }
        public DateTime? ComplianceDate { get; set; }
        public DateTime? NextComplianceDate { get; set; }
        public DocumentedType? Documented { get; set; }
        public int? DocumentedPercentage { get; set; }
        public ImplementedType? Implemented { get; set; }
        public int? ImplementedPercentage { get; set; }
        public EffectiveType? Effective { get; set; }
        public int? EffectivePercentage { get; set; }
        public string Comment { get; set; }
        public Guid? AttachmentId { get; set; }

        public Assessment Assessment { get; set; }
        protected AssessmentVersion()
        {
        }

        public AssessmentVersion(
            Guid id
        ) : base(id)
        {
        }
    }
}
