using RMG.ComplianceSystem.Controls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Assessments
{
    public class Assessment : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Guid ControlId { get; set; }
        public ApplicableType? Applicable { get; set; }
        public ComplianceLevelType? ComplianceLevel { get; set; }
        public DateTime? ComplianceDate { get; set; }
        public DateTime? NextComplianceDate { get; set; }
        public DocumentedType? Documented { get; set; }
        public PriorityType? Priority { get; set; }
        public int? DocumentedPercentage { get; set; }
        public ImplementedType? Implemented { get; set; }
        public int? ImplementedPercentage { get; set; }
        public EffectiveType? Effective { get; set; }
        public int? EffectivePercentage { get; set; }
        public string Comment { get; set; }
        public Guid? AttachmentId { get; set; }

        public virtual Control Control { get; set; }
        public virtual ICollection<AssessmentEmployee> AssessmentEmployees { get; set; }
        public virtual ICollection<AssessmentVersion> AssessmentVersions { get; set; }

        protected Assessment()
        {
        }

        public Assessment(
            Guid id,
            Guid controlId,
            ApplicableType applicable,
            ComplianceLevelType complianceLevel,
            DateTime complianceDate,
            DateTime nextComplianceDate,
            DocumentedType documented,
            ImplementedType implemented,
            EffectiveType effective,
            string comment,
            Guid? attachmentId
        ) : base(id)
        {
            ControlId = controlId;
            Applicable = applicable;
            ComplianceLevel = complianceLevel;
            ComplianceDate = complianceDate;
            NextComplianceDate = nextComplianceDate;
            Documented = documented;
            Implemented = implemented;
            Effective = effective;
            Comment = comment;
            AttachmentId = attachmentId;
        }

        public void AddAssessmentEmployee(AssessmentEmployee entity)
        {
            if (AssessmentEmployees is null)
                AssessmentEmployees = new List<AssessmentEmployee>();
            AssessmentEmployees.Add(entity);
        }

        public void SetComplianceDate(DateTime date)
        {
            ComplianceDate = date;
        }
    }
}
