using System;
using System.ComponentModel.DataAnnotations;

namespace RMG.ComplianceSystem.Risks.Dtos
{
    [Serializable]
    public class CreateUpdateRiskDto
    {

        [Required]
        [StringLength(128)]
        public string NameAr { get; set; }
        [Required]
        [StringLength(128)] 
        public string NameEn { get; set; }
        [Required]
        public int Level { get; set; }
    }
}
