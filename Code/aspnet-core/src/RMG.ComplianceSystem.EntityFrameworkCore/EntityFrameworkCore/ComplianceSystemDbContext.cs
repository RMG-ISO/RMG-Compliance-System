using Microsoft.EntityFrameworkCore;
using RMG.ComplianceSystem.Authors;
using RMG.ComplianceSystem.Books;
using Volo.Abp.AuditLogging.EntityFrameworkCore;
using Volo.Abp.BackgroundJobs.EntityFrameworkCore;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.EntityFrameworkCore;
using Volo.Abp.EntityFrameworkCore.Modeling;
using Volo.Abp.FeatureManagement.EntityFrameworkCore;
using Volo.Abp.Identity;
using Volo.Abp.Identity.EntityFrameworkCore;
using Volo.Abp.IdentityServer.EntityFrameworkCore;
using Volo.Abp.PermissionManagement.EntityFrameworkCore;
using Volo.Abp.SettingManagement.EntityFrameworkCore;
using Volo.Abp.TenantManagement;
using Volo.Abp.TenantManagement.EntityFrameworkCore;
using RMG.ComplianceSystem.Attachments;
using RMG.ComplianceSystem.Frameworks;
using RMG.ComplianceSystem.Departments;
using RMG.ComplianceSystem.Employees;
using RMG.ComplianceSystem.Domains;
using RMG.ComplianceSystem.Controls;
using RMG.ComplianceSystem.Assessments;
using RMG.ComplianceSystem.Policies;
using RMG.ComplianceSystem.Documents;
using RMG.ComplianceSystem.Risks.Entity;
using RMG.ComplianceSystem.StaticData;

namespace RMG.ComplianceSystem.EntityFrameworkCore
{
    [ReplaceDbContext(typeof(IIdentityDbContext))]
    [ReplaceDbContext(typeof(ITenantManagementDbContext))]
    [ConnectionStringName("Default")]
    public class ComplianceSystemDbContext :
        AbpDbContext<ComplianceSystemDbContext>,
        IIdentityDbContext,
        ITenantManagementDbContext
    {
        /* Add DbSet properties for your Aggregate Roots / Entities here. */

        #region Entities from the modules

        /* Notice: We only implemented IIdentityDbContext and ITenantManagementDbContext
         * and replaced them for this DbContext. This allows you to perform JOIN
         * queries for the entities of these modules over the repositories easily. You
         * typically don't need that for other modules. But, if you need, you can
         * implement the DbContext interface of the needed module and use ReplaceDbContext
         * attribute just like IIdentityDbContext and ITenantManagementDbContext.
         *
         * More info: Replacing a DbContext of a module ensures that the related module
         * uses this DbContext on runtime. Otherwise, it will use its own DbContext class.
         */

        //Identity
        public DbSet<IdentityUser> Users { get; set; }
        public DbSet<IdentityRole> Roles { get; set; }
        public DbSet<IdentityClaimType> ClaimTypes { get; set; }
        public DbSet<OrganizationUnit> OrganizationUnits { get; set; }
        public DbSet<IdentitySecurityLog> SecurityLogs { get; set; }
        public DbSet<IdentityLinkUser> LinkUsers { get; set; }

        // Tenant Management
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<TenantConnectionString> TenantConnectionStrings { get; set; }

        #endregion

        #region Custom Entities 
        public DbSet<Book> Books { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<DocumentCategory> DocumentCategories { get; set; }
        public DbSet<RiskAndOpportunity> RisksAndOpportunities { get; set; }
        public DbSet<HistoryRiskAndOpportunity> HistoryRisksAndOpportunities { get; set; }
        public DbSet<StaticDatatb> StaticDatatb { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<AttachmentFile> AttachmentFiles { get; set; }
        public DbSet<Framework> Frameworks { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Domain> Domains { get; set; }
        public DbSet<Control> Controls { get; set; }
        public DbSet<Assessment> Assessments { get; set; }
        public DbSet<AssessmentEmployee> AssessmentEmployees { get; set; }
        public DbSet<DomainDepartment> DomainDepartments { get; set; }
        #endregion



        public ComplianceSystemDbContext(DbContextOptions<ComplianceSystemDbContext> options)
            : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            /* Include modules to your migration db context */

            builder.ConfigurePermissionManagement();
            builder.ConfigureSettingManagement();
            builder.ConfigureBackgroundJobs();
            builder.ConfigureAuditLogging();
            builder.ConfigureIdentity();
            builder.ConfigureIdentityServer();
            builder.ConfigureFeatureManagement();
            builder.ConfigureTenantManagement();

            /* Configure your own tables/entities inside here */

            #region Configuration Entities aand validation
            //Example
            //------------------
            //builder.Entity<YourEntity>(b =>
            //{
            //    b.ToTable(ComplianceSystemConsts.DbTablePrefix + "YourEntities", ComplianceSystemConsts.DbSchema);
            //    b.ConfigureByConvention(); //auto configure for the base class props
            //    //...
            //});

            builder.Entity<Book>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Books",
                    ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();
                b.Property(x => x.Name).IsRequired().HasMaxLength(128);
                b.HasOne<Author>().WithMany().HasForeignKey(x => x.AuthorId).IsRequired();
            });
            builder.Entity<Document>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Documents",
                    ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();
            });
            builder.Entity<DocumentCategory>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "DocumentCategories",
                    ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();
            });
                   builder.Entity<RiskAndOpportunity>(b =>
                   {
                       b.ToTable(ComplianceSystemConsts.DbTablePrefix + "RisksAndOpportunities",
                           ComplianceSystemConsts.DbSchema);
                       b.ConfigureByConvention();
                   });
            builder.Entity<HistoryRiskAndOpportunity>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "HistoryRisksAndOpportunities",
                    ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();
            });
            builder.Entity<StaticDatatb>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "StaticDatatb",
                    ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();
            });

            builder.Entity<Author>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Authors",
                    ComplianceSystemConsts.DbSchema);

                b.ConfigureByConvention();

                b.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(AuthorConsts.MaxNameLength);

                b.HasIndex(x => x.Name);
            });


            builder.Entity<Attachment>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Attachments", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */

                b.HasMany(t => t.AttachmentFiles).WithOne(t => t.Attachment).HasForeignKey(t => t.AttachmentId);
            });


            builder.Entity<AttachmentFile>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "AttachmentFiles", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */
            });


            builder.Entity<Framework>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Frameworks", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */
            });


            builder.Entity<Department>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Departments", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */

                b.HasMany(t => t.Employees).WithOne(t => t.Department).HasForeignKey(t => t.DepartmentId).IsRequired(false);
            });


            builder.Entity<Employee>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Employees", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */
            });


            builder.Entity<Domain>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Domains", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */

                b.HasOne(t => t.Framework).WithMany(t => t.Domains).HasForeignKey(t => t.FrameworkId);
                b.HasOne(t => t.Parent).WithMany(t => t.Children).HasForeignKey(t => t.ParentId).IsRequired(false);
            });


            builder.Entity<Control>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Controls", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */
            });


            builder.Entity<Assessment>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "Assessments", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();


                /* Configure more properties here */
                b.HasOne(t => t.Control).WithMany(t => t.Assessments).HasForeignKey(t => t.ControlId);

            });


            builder.Entity<AssessmentEmployee>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "AssessmentEmployees", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();

                b.HasKey(e => new
                {
                    e.AssessmentId,
                    e.EmployeeId,
                });

                /* Configure more properties here */

                b.HasOne(t => t.Assessment).WithMany(t => t.AssessmentEmployees).HasForeignKey(t => t.AssessmentId);
                b.HasOne(t => t.Employee).WithMany(t => t.AssessmentEmployees).HasForeignKey(t => t.EmployeeId);
            });


            builder.Entity<DomainDepartment>(b =>
            {
                b.ToTable(ComplianceSystemConsts.DbTablePrefix + "DomainDepartments", ComplianceSystemConsts.DbSchema);
                b.ConfigureByConvention();

                b.HasKey(e => new
                {
                    e.DomainId,
                    e.DepartmentId,
                });

                /* Configure more properties here */

                b.HasOne(t => t.Domain).WithMany(t => t.DomainDepartments).HasForeignKey(t => t.DomainId);
                b.HasOne(t => t.Department).WithMany(t => t.DomainDepartments).HasForeignKey(t => t.DepartmentId);

            });
            #endregion
        }
    }
}
