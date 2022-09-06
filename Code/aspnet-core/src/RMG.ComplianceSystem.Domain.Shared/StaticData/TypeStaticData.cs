using System;
using System.Collections.Generic;
using System.Text;

namespace RMG.ComplianceSystem.StaticData
{
    public enum TypeStaticData
    {
        Sector=1, Department=4, Category=5
    }
    public class getEnumTypeStaticData
    {
        public int Id { get; set; }
        public string NameEn { get; set; }
        public string NameAr { get; set; }
    }
   public class getMatrix
    {
        public List<getEnumTypeStaticData> likehood { get; set; }
        public List<getEnumTypeStaticData> Impact { get; set; }
    }

}
