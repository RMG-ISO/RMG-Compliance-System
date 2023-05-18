using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks
{
    public class Framework : FullAuditedAggregateRootWithUser<Guid, IdentityUser>
    {

        public string NameAr { get; set; }
        public string NameEn { get; set; }
        public Guid OwnerId { get; set; }
        public string ShortcutAr { get; set; }
        public string ShortcutEn { get; set; }
        public string DescriptionAr { get; set; }
        public string DescriptionEn { get; set; }
        public SharedStatus Status { get; set; }
        public FrameworkStatus FrameworkStatus { get; set; }
        public Guid AttachmentId { get; set; }
        public Guid ManagementId { get; set; }
        public Guid ReviewUserId { get; set; }
        public Guid ApproveUserId { get; set; }
        public string LevelFirstNameAr { get; set; }
        public string LevelFirstNameEn { get; set; }

        public string LevelSecondNameAr { get; set; }
        public string LevelSecondNameEn { get; set; }

        public string LevelThirdNameAr { get; set; }
        public string LevelThirdNameEn { get; set; }

        public string LevelFourNameAr { get; set; }
        public string LevelFourNameEn { get; set; }

        

        public virtual ICollection<Domain> Domains { get; set; }
        public virtual ICollection<FrameworkChangeStatusLog> ChangeStatusLogs { get; set; } = new HashSet<FrameworkChangeStatusLog>();

        protected Framework()
        {
        }

        public Framework(
            Guid id,
            string nameAr,
            string nameEn,
            string shortcutAr,
            string shortcutEn,
            string descriptionAr,
            string descriptionEn,
            SharedStatus status,
            FrameworkStatus frameworkStatus,
            Guid attachmentId,
            Guid reviewUserId, Guid approveUserId, string levelFirstNameAr,string levelFirstNameEn
            ,string levelSecondNameAr, string levelSecondNameEn,string levelThirdNameAr,
            string levelThirdNameEn,string  levelFourNameAr, string levelFourNameEn
        ) : base(id)
        {
            NameAr = nameAr;
            NameEn = nameEn;
            ShortcutAr = shortcutAr;
            ShortcutEn = shortcutEn;
            DescriptionAr = descriptionAr;
            DescriptionEn = descriptionEn;
            Status = status;
            FrameworkStatus=frameworkStatus;
            AttachmentId = attachmentId;
            ReviewUserId= reviewUserId;ApproveUserId=approveUserId; LevelFirstNameAr=levelFirstNameAr; 
            LevelFirstNameEn=levelFirstNameEn;
            LevelSecondNameAr= levelSecondNameAr; LevelSecondNameEn=levelSecondNameEn;
            LevelThirdNameAr= levelThirdNameAr; LevelThirdNameEn= levelThirdNameEn; LevelFourNameAr = levelFourNameAr;
            LevelFourNameEn = levelFourNameEn;
        }
    }
}
