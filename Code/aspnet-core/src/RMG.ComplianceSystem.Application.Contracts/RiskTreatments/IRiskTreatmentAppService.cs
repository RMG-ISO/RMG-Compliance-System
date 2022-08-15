using RMG.ComplianceSystem.RiskTreatments.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.RiskTreatments
{
    public interface IRiskTreatmentAppService :
     ICrudAppService< //Defines CRUD methods
         RiskTreatmentDto, //Used to show books
         Guid, //Primary key of the book entity
         RiskTreatmentPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateRiskTreatmentDto> //Used to create/update a book
    {
        Task<PagedResultDto<RiskTreatmentDto>> GetListRiskByFilterAsync(RiskTreatmentPagedAndSortedResultRequestDto input);
    }
}
