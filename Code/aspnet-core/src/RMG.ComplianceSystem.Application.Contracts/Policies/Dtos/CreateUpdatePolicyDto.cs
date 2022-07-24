using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RMG.ComplianceSystem.Policies.Dtos
{
    [Serializable]
    public class CreateUpdatePolicyDto
    {

        [Required]
        [StringLength(128)]
        public string Title { get; set; }
        [Required]
        public string TermsAndPrivacy { get; set; }
        public bool Approve { get; set; }

        public int CompanyId { get; set; }
        public Guid AttachmentId { get; set; }
    }
}
