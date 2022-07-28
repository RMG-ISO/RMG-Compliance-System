using RMG.ComplianceSystem.Documents;
using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.Documents
{
    public interface IDocumentCategoryRepository : IRepository<DocumentCategory, Guid>
    {
    }
}