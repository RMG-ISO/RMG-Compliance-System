using RMG.ComplianceSystem.Assessments.Dtos;
using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Domains.Dtos;
using System.Collections.Generic;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    public class ComplainceDto
    {
        public List<FrameworkData> FrameworkData { get; set; }

    }
    public class FrameworkData
    {
        public int TotalApplicable { get; set; }
        public int TotalNotApplicable { get; set; }

        public FrameworkDto FrameworkDto { get; set; }
        public List<MainDomainsDto> DomainDta { get; set; }
    }
    public class MainDomainsDto
    {
        public int LevelOne { get; set; }
        public int LevelTwo { get; set; }
        public int LevelThree { get; set; }
        public int Levelfour { get; set; }
        public int LevelFive { get; set; }
        public DomainDto Maindomain { get; set; }
        public List<SubDomainsDto> ChildrenDomains { get; set; }
    }
    public class SubDomainsDto
    {
        public DomainDto Subdomain { get; set; }
        public List<MainControlsDto> ChildrenControls { get; set; }
    }
    public class MainControlsDto
    {
        public ControlDto MainControl { get; set; }
        public List<SubControlsDto> subControl { get; set; }
        public AssessmentDto AssessmentDto { get; set; }
    }
    public class SubControlsDto
    {
        public ControlDto subControl { get; set; }
        public AssessmentDto AssessmentDto { get; set; }
    }


    public class FrameworkDetailDto
    {
        public FrameworkData FrameworkData { get; set; }

    }

}
