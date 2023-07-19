using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Policies
{
    public class CategoryDto : EntityDto<Guid>
    {
        public string NameEn { get; set; }
        public string NameAr { get; set; }
    }
}
