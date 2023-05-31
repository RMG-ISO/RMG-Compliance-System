using RMG.ComplianceSystem.Attachments.Dtos;
using RMG.ComplianceSystem.InternalAuditPreparation.Dto;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class FrameworkDto : FullAuditedEntityWithUserDto<Guid,IdentityUserDto>
    {
        public string ManagementName { get; set; }
        public string ReviewUserName { get; set; }
        public string OwnerName { get; set; }
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string ShortcutAr { get; set; }

        public string ShortcutEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }
        public Guid ManagementId { get; set; }
        public SharedStatus Status { get; set; }
        public FrameworkStatus FrameworkStatus { get; set; }
        public Guid? AttachmentId { get; set; }
        public Guid ReviewUserId { get; set; }
        public Guid ApproveUserId { get; set; }
        public string LevelFirstNameAr { get; set; }
        public string LevelFirstNameEn { get; set; }
        public string LevelSecondNameAr { get; set; }
        public string LevelSecondNameEn { get; set; }
        public string LevelThirdNameAr { get; set; }
        public string LevelThirdNameEn { get; set; }
        public Guid OwnerId { get; set; }
        public string LevelFourNameAr { get; set; }
        public string LevelFourNameEn { get; set; }

        public ComplianceStatus ComplianceStatus { get; set; }
        public DateTime? SelfAssessmentStartDate { get; set; }
        public DateTime? SelfAssessmentEndDate { get; set; }

        public bool CanSendForInternalAssessment { get; set; } = false;

        public DateTime? InternalAssessmentStartDate { get; set; }
        public DateTime? InternalAssessmentEndDate { get; set; }
        public List<FrameworkEmpDto> FrameworkEmpsDto { get; set; } = new List<FrameworkEmpDto>();
        public List<FrameworkChangeStatusLogDto> ChangeStatusLogs { get; set; }

    }

    public class FrameworkEmpDto 
    {
        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }

    }
    public class FrameworkEmp
    {
        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }

        protected FrameworkEmp() { }
        public FrameworkEmp(
          Guid frameworkId,
          Guid employeeId
      )
        {
            FrameworkId = frameworkId;  
            EmployeeId = employeeId;    

        }
    }


}