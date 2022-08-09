using System.Linq;

namespace RMG.ComplianceSystem.StaticData
{
    public static class StaticDataEfCoreQueryableExtensions
    {
        public static IQueryable<StaticDatatb> IncludeDetails(this IQueryable<StaticDatatb> queryable, bool include = true)
        {
                return queryable;
            
                ;
        }
    }
}