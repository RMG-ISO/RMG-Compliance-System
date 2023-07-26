using RMG.ComplianceSystem.Shared;
using System;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentEmployeeDto : NameId<Guid>
    {
        public bool IsRequired { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
