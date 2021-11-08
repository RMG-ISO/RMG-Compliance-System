using RMG.ComplianceSystem.Shared;
using System;
using System.ComponentModel;
namespace RMG.ComplianceSystem.Frameworks.Dtos
{
    [Serializable]
    public class CreateUpdateFrameworkDto
    {
        public string NameAr { get; set; }

        public string NameEn { get; set; }

        public string ShortcutAr { get; set; }

        public string ShortcutEn { get; set; }

        public string DescriptionAr { get; set; }

        public string DescriptionEn { get; set; }

        public SharedStatus Status { get; set; }
    }
}