using System;
using System.Collections.Generic;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.EmailTemplates.Dtos
{
    public class EmailTemplatePagedAndSortedResultRequestDto : PagedAndSortedResultRequestDto
    {
        public string Key { get; set; }
        public string Subject { get; set; }
    }
}
