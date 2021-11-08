using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Employees.Dtos
{
    [Serializable]
    public class CreateUpdateEmployeeDto
    {
        public string FullName { get; set; }

        public string Email { get; set; }

        public Guid DepartmentId { get; set; }

        public bool IsManager { get; set; }

    }
}