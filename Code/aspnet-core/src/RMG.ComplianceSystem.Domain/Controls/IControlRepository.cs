using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Controls
{
    public interface IControlRepository : IRepository<Control, Guid>
    {
    }
}