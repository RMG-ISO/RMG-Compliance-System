using System;
using RMG.ComplianceSystem.EntityFrameworkCore;
using Volo.Abp.Domain.Repositories.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;

namespace RMG.ComplianceSystem.Controls
{
    public class ControlRepository : EfCoreRepository<ComplianceSystemDbContext, Control, Guid>, IControlRepository
    {
        public ControlRepository(IDbContextProvider<ComplianceSystemDbContext> dbContextProvider) : base(dbContextProvider)
        {
        }
    }
}