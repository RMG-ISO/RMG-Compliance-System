using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.StaticData
{
    [Serializable]
    public class StaticDataDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public Guid? ParentId { get; set; }
        //TypeStaticData (Enum)
        public int Type { get; set; }
        //TypeStaticData (Enum)
        public string TypeName { get; set; }
        public Guid? TenantId { get; set; }  
        

    }
}
