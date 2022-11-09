﻿using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.InternalAuditQuestionLists;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;
using static System.Net.Mime.MediaTypeNames;

namespace RMG.ComplianceSystem.InternalAuditApproves
{
    public class InternalAuditApprove : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {
        public Boolean IsApprove { get; set; }
        public DateTime approveDate { get; set; }
        public Guid ApproveBy { get; set; }
        public string CausesRefuse { get; set; }




    }
}
