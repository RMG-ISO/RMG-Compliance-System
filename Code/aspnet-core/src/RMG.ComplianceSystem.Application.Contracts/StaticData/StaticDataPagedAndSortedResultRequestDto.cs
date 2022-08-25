using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.StaticData
{
    public class StaticDataPagedAndSortedResultRequestDto:PagedAndSortedResultRequestDto
    {
        public string Search { get; set; }

        public Guid? ParentId { get; set; }
        public int? Type { get; set; }
    }
}
