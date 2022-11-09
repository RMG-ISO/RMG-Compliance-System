using System;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    
    public interface IDepartmentUserAppService :
     ICrudAppService< //Defines CRUD methods
         DepartmentUserDto, //Used to show books
         Guid, //Primary key of the book entity
         DepartmentUserPagedAndSortedResultRequestDto, //Used for paging/sorting
         CreateUpdateDepartmentUserDto> //Used to create/update a book
    {
        Task<PagedResultDto<DepartmentUserDto>> GetListDeptUsersByFilterAsync(DepartmentUserPagedAndSortedResultRequestDto input);
    }
}