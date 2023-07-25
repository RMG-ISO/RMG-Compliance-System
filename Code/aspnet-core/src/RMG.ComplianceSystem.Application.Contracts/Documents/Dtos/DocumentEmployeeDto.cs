using JetBrains.Annotations;
using RMG.ComplianceSystem.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentEmployeeDto : NameId<Guid>
    {
        public bool IsRequired { get; set; }
    }
}
