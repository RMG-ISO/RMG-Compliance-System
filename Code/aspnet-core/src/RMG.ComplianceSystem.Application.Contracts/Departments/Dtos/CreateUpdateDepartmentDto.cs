using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Departments.Dtos
{
    [Serializable]
    public class CreateUpdateDepartmentDto
    {
        public string Name { get; set; }
    }
}