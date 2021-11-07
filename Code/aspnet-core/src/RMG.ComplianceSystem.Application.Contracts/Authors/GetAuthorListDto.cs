using Volo.Abp.Application.Dtos;

namespace RMG.ComplianceSystem.Authors
{
    public class GetAuthorListDto : PagedAndSortedResultRequestDto
    {
        public string Filter { get; set; }
    }
}