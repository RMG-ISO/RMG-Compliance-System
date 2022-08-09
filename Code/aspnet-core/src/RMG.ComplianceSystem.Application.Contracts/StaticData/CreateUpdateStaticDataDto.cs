using System;
using System.ComponentModel.DataAnnotations;

namespace RMG.ComplianceSystem.StaticData
{
    [Serializable]
    public class CreateUpdateStaticDataDto
    {
        public Guid Id { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
        //TypeStaticData (Enum)
        public int Type { get; set; }
        public Guid TenantId { get; set; }
    }
}
