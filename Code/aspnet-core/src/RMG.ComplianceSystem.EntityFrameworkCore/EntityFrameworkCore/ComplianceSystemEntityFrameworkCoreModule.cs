using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Attachments;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.SqlServer;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.IdentityServer.EntityFrameworkCore;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using RMG.ComplianceSystem.Policies;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.Risks;
using RMG.ComplianceSystem.StaticData;
using RMG.ComplianceSystem.RiskTreatments;

namespace RMG.ComplianceSystem.EntityFrameworkCore
{
    [DependsOn(
        typeof(ComplianceSystemDomainModule),
        typeof(AbpIdentityEntityFrameworkCoreModule),
        typeof(AbpIdentityServerEntityFrameworkCoreModule),
        typeof(AbpPermissionManagementEntityFrameworkCoreModule),
        typeof(AbpSettingManagementEntityFrameworkCoreModule),
        typeof(AbpEntityFrameworkCoreSqlServerModule),
        typeof(AbpBackgroundJobsEntityFrameworkCoreModule),
        typeof(AbpAuditLoggingEntityFrameworkCoreModule),
        typeof(AbpTenantManagementEntityFrameworkCoreModule),
        typeof(AbpFeatureManagementEntityFrameworkCoreModule)
        )]
    public class ComplianceSystemEntityFrameworkCoreModule : AbpModule
    {
        public override void PreConfigureServices(ServiceConfigurationContext context)
        {
            ComplianceSystemEfCoreEntityExtensionMappings.Configure();
        }

        public override void ConfigureServices(ServiceConfigurationContext context)
        {
            context.Services.AddAbpDbContext<ComplianceSystemDbContext>(options =>
            {
                /* Remove "includeAllEntities: true" to create
                 * default repositories only for aggregate roots */
                options.AddDefaultRepositories(includeAllEntities: true);
                options.AddRepository<Attachment, AttachmentRepository>();
                options.AddRepository<Document, DocumentRepository>();
                options.AddRepository<RiskOpportunity, RiskAndOpportunityRepository>();
                options.AddRepository<HistoryRiskOpportunity, HistoryRiskAndOpportunityRepository>();
                options.AddRepository<StaticDatatb, StaticDataRepository>();
                options.AddRepository<RisksTreatment, RiskTreatmentRepository>();
                options.AddRepository<DocumentCategory, DocumentCategoryRepository>();
                options.AddRepository<AttachmentFile, AttachmentFileRepository>();
                options.AddRepository<Framework, FrameworkRepository>();
                options.AddRepository<Department, DepartmentRepository>();
                options.AddRepository<Employee, EmployeeRepository>();
                options.AddRepository<Domain, DomainRepository>();
                options.AddRepository<Control, ControlRepository>();
                options.AddRepository<Assessment, AssessmentRepository>();
                options.AddRepository<AssessmentEmployee, AssessmentEmployeeRepository>();
                options.AddRepository<DomainDepartment, DomainDepartmentRepository>();
            });

            Configure<AbpDbContextOptions>(options =>
            {
                /* The main point to change your DBMS.
                 * See also ComplianceSystemMigrationsDbContextFactory for EF Core tooling. */
                options.UseSqlServer();
            });
        }
    }
}
