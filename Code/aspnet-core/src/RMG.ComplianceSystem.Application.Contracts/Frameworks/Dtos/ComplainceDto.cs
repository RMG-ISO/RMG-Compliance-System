using RMG.ComplianceSystem.Assessments.Dtos;
using RMG.ComplianceSystem.Controls.Dtos;
using RMG.ComplianceSystem.Domains.Dtos;
using System.Collections.Generic;

namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    public class ComplainceDto
    {
        public int Applicable { get; set; }
        public int NotApplicable { get; set; }
        public FrameworkData FrameworkData { get; set; }

    }
    public class FrameworkData
    {
        public FrameworkDto FrameworkDto { get; set; }
        public List<DomainsDta> DomaindDta { get; set; }
    }
    public class DomainsDta
    {
       public DomainDto subdomain { get; set; }
        public List<ControlsDto> ChildrenControls { get; set; }
    }
    public class ControlsDto
    {
        public ControlDto subControl { get; set; }
        public AssessmentDto AssessmentDto { get; set; }
    }

}
