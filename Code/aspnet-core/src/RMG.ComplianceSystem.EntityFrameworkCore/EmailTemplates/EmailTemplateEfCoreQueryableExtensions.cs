using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public static class EmailTemplateEfCoreQueryableExtensions
    {

        public static IQueryable<EmailTemplate> IncludeDetails(this IQueryable<EmailTemplate> queryable, bool include = true)
        {
           
                return queryable;
           

           
        }
    }
}
