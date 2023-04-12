using RMG.ComplianceSystem.Shared;
using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class CreateUpdateFrameworkEmployeeDto
    {

        public Guid FrameworkId { get; set; }
        public Guid EmployeeId { get; set; }


    }
}