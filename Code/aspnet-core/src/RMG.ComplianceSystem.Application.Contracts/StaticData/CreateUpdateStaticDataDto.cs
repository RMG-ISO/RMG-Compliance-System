using System;
using System.ComponentModel.DataAnnotations;

namespace RMG.ComplianceSystem.StaticData
{
    [Serializable]
    public class CreateUpdateStaticDataDto
    {
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        public Guid? ParentId { get; set; }
        //TypeStaticData (Enum)
        public int Type { get; set; }
        public Guid TenantId { get; set; }
    }
}
