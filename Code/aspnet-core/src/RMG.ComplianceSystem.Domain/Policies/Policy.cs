using JetBrains.Annotations;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace RMG.ComplianceSystem.Policies
{
    public class Policy : FullAuditedAggregateRoot<Guid>
    {
        [NotNull]
        public string Code { get; set; }
        [NotNull]
        public string NameEn { get; set; }
        [NotNull]
        public string NameAr { get; set; }
        public PolicyType Type { get; set; }

        public DateTime? ValidationStartDate { get; set; }
        public DateTime? ValidationEndtDate { get; set; }


        [Range(0, 100)]
        public int CompliancePercentage { get; set; }
        public PolicyStatus Status { get; set; }
        [NotNull]
        public string Description { get; set; }

        public virtual ICollection<PolicyOwner> Owners { get; set; }
        public virtual ICollection<PolicyReviwer> Reviewers { get; set; }
        public virtual ICollection<PolicyApprover> Approvers { get; set; }

        public virtual ICollection<Category> PolicyCategories { get; set; }

        public void AddOwners (IList<Guid> ownersIds)
        {
            Owners = ownersIds.Select(ownerId => new PolicyOwner (this.Id ,ownerId )).ToList();
        }

        public void AddReviewers(IList<Guid> reviewersIds)
        {
            Reviewers = reviewersIds.Select(reviewerId => new PolicyReviwer(this.Id, reviewerId)).ToList();
        }
        public void AddApprover(IList<Guid> approverIds)
        {
            Approvers = approverIds.Select(approverId => new PolicyApprover(this.Id, approverId)).ToList();
        }

        public void AddCategories(IList<Category> categories)
        {
            PolicyCategories = categories;
        }
    }
}
