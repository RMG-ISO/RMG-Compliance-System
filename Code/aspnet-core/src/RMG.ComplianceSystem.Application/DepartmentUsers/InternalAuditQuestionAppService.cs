using System;
using System.Threading.Tasks;
using RMG.ComplianceSystem.Permissions;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Identity;
using RMG.ComplianceSystem.Frameworks;

namespace RMG.ComplianceSystem.DepartmentUsers
{
    // [Authorize(ComplianceSystemPermissions.DepartmentUser.Default)]
    public class DepartmentUserAppService :
        CrudAppService<
            DepartmentUser, //The DepartmentUser entity
            DepartmentUserDto, //Used to show DepartmentUsers
            Guid, //Primary key of the DepartmentUser entity
            DepartmentUserPagedAndSortedResultRequestDto, //Used for paging/sorting
            CreateUpdateDepartmentUserDto>, //Used to create/update a DepartmentUser
        IDepartmentUserAppService //implement the IDepartmentUserAppService
    {
        //   Start Permissions
        #region Start Permissions
        protected override string GetPolicyName { get; set; } = ComplianceSystemPermissions.DepartmentUser.Default;
        protected override string GetListPolicyName { get; set; } = ComplianceSystemPermissions.DepartmentUser.Default;
        protected override string CreatePolicyName { get; set; } = ComplianceSystemPermissions.DepartmentUser.Create;
        protected override string UpdatePolicyName { get; set; } = ComplianceSystemPermissions.DepartmentUser.Update;
        protected override string DeletePolicyName { get; set; } = ComplianceSystemPermissions.DepartmentUser.Delete;
        #endregion
        // End Permissions
        //Start Properties and Constructor DepartmentUserAppService
        #region Start Properties and Constructor DepartmentUserAppService
        private readonly IDepartmentUserRepository DepartmentUserRepository;
        private readonly IdentityUserManager User;
        private readonly IFrameworkRepository _FrameworkRepository;

        public DepartmentUserAppService(IdentityUserManager _User, IFrameworkRepository FrameworkRepository, IDepartmentUserRepository _DepartmentUserRepository) : base(_DepartmentUserRepository)
        {
            DepartmentUserRepository = _DepartmentUserRepository;
            User = _User;
            _FrameworkRepository= FrameworkRepository;
        }


        #endregion
        //End Properties and Constructor DepartmentUserAppService
        //Start Methods getbyId and GetListDepartmentUserBy
        #region Start Methods getbyId and 

        public Task<PagedResultDto<DepartmentUserDto>> GetListDeptUsersByFilterAsync(DepartmentUserPagedAndSortedResultRequestDto input)
        {
            throw new NotImplementedException();
        }
        #endregion


    }
}
