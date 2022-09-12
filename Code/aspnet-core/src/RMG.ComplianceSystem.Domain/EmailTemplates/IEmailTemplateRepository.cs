using System;
using Volo.Abp.Domain.Repositories;

namespace RMG.ComplianceSystem.EmailTemplates
{
    public interface IEmailTemplateRepository : IRepository<EmailTemplate, Guid>
    {
    }
}