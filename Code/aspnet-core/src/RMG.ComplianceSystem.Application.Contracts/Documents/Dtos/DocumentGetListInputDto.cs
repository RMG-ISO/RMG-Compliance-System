using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Documents.Dtos
{
    public class DocumentGetListInputDto : PagedAndSortedResultRequestDto
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}