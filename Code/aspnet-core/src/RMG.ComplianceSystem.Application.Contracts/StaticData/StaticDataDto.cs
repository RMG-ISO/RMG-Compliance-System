using System;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Identity;

namespace RMG.ComplianceSystem.StaticData
{
    [Serializable]
    public class StaticDataDto : FullAuditedEntityWithUserDto<Guid, IdentityUserDto>
    {
        public Guid Id { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        //TypeStaticData (Enum)
        public int Type { get; set; }
        //TypeStaticData (Enum)
        public string TypeName { get; set; }
        public Guid TenantId { get; set; }  
        

    }
}
