using Newtonsoft.Json.Serialization;
using RMG.ComplianceSystem.Departments.Dtos;
using RMG.ComplianceSystem.Risks.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    [Serializable]
    public class CreateUpdateDepartmentUserDto
    {
        public Guid DepartmentId { get; set; }
        public Guid UserId { get; set; }
    }
}
