using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class fix_document_names : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_CreatorId",
                table: "AppDocumentCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_DeleterId",
                table: "AppDocumentCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_LastModifierId",
                table: "AppDocumentCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AbpUsers_CreatorId",
                table: "AppDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AbpUsers_DeleterId",
                table: "AppDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AbpUsers_LastModifierId",
                table: "AppDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AppAttachments_AttachmentId",
                table: "AppDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AppDocumentCategories_DocumentCategoryId",
                table: "AppDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentSections_AppPolicies_DocumentId",
                table: "AppDocumentSections");

            migrationBuilder.DropTable(
                name: "AppPolicyApprovers");

            migrationBuilder.DropTable(
                name: "AppPolicyOwners");

            migrationBuilder.DropTable(
                name: "AppPolicyReviwers");

            migrationBuilder.DropTable(
                name: "CategoryPolicy");

            migrationBuilder.DropTable(
                name: "AppPolicies");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_AttachmentId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_CreatorId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_DeleterId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_DocumentCategoryId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_LastModifierId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocumentCategories_CreatorId",
                table: "AppDocumentCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppDocumentCategories_DeleterId",
                table: "AppDocumentCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppDocumentCategories_LastModifierId",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "AttachmentId",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "DocumentCategoryId",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "LastModificationTime",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "LastModifierId",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "NameAr",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "NameEn",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "NameAr",
                table: "AppCategories");

            migrationBuilder.RenameColumn(
                name: "TitleEn",
                table: "AppDocuments",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "TitleAr",
                table: "AppDocuments",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "TenantId",
                table: "AppDocumentCategories",
                newName: "DocumentId");

            migrationBuilder.RenameColumn(
                name: "NameEn",
                table: "AppCategories",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "AppDocuments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CompliancePercentage",
                table: "AppDocuments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AppDocuments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AppDocuments",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidationEndtDate",
                table: "AppDocuments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ValidationStartDate",
                table: "AppDocuments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "AppDocumentCategories",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "AppDocumentApprovers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    DocumentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDocumentApprovers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppDocumentApprovers_AppDocuments_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "AppDocuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDocumentApprovers_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppDocumentOwners",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDocumentOwners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppDocumentOwners_AppDocuments_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "AppDocuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDocumentOwners_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppDocumentReviewers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    DocumentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDocumentReviewers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppDocumentReviewers_AppDocuments_DocumentId",
                        column: x => x.DocumentId,
                        principalTable: "AppDocuments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDocumentReviewers_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentCategories_CategoryId",
                table: "AppDocumentCategories",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentCategories_DocumentId",
                table: "AppDocumentCategories",
                column: "DocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentApprovers_DocumentId",
                table: "AppDocumentApprovers",
                column: "DocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentApprovers_EmployeeId",
                table: "AppDocumentApprovers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentOwners_DocumentId",
                table: "AppDocumentOwners",
                column: "DocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentOwners_EmployeeId",
                table: "AppDocumentOwners",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentReviewers_DocumentId",
                table: "AppDocumentReviewers",
                column: "DocumentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentReviewers_EmployeeId",
                table: "AppDocumentReviewers",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentCategories_AppCategories_CategoryId",
                table: "AppDocumentCategories",
                column: "CategoryId",
                principalTable: "AppCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentCategories_AppDocuments_DocumentId",
                table: "AppDocumentCategories",
                column: "DocumentId",
                principalTable: "AppDocuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentSections_AppDocuments_DocumentId",
                table: "AppDocumentSections",
                column: "DocumentId",
                principalTable: "AppDocuments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentCategories_AppCategories_CategoryId",
                table: "AppDocumentCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentCategories_AppDocuments_DocumentId",
                table: "AppDocumentCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppDocumentSections_AppDocuments_DocumentId",
                table: "AppDocumentSections");

            migrationBuilder.DropTable(
                name: "AppDocumentApprovers");

            migrationBuilder.DropTable(
                name: "AppDocumentOwners");

            migrationBuilder.DropTable(
                name: "AppDocumentReviewers");

            migrationBuilder.DropIndex(
                name: "IX_AppDocumentCategories_CategoryId",
                table: "AppDocumentCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppDocumentCategories_DocumentId",
                table: "AppDocumentCategories");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "CompliancePercentage",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ValidationEndtDate",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ValidationStartDate",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AppDocumentCategories");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "AppDocuments",
                newName: "TitleEn");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "AppDocuments",
                newName: "TitleAr");

            migrationBuilder.RenameColumn(
                name: "DocumentId",
                table: "AppDocumentCategories",
                newName: "TenantId");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "AppCategories",
                newName: "NameEn");

            migrationBuilder.AddColumn<Guid>(
                name: "AttachmentId",
                table: "AppDocuments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "AppDocuments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DocumentCategoryId",
                table: "AppDocuments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "AppDocumentCategories",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppDocumentCategories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppDocumentCategories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "AppDocumentCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppDocumentCategories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastModificationTime",
                table: "AppDocumentCategories",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "LastModifierId",
                table: "AppDocumentCategories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameAr",
                table: "AppDocumentCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameEn",
                table: "AppDocumentCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameAr",
                table: "AppCategories",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppPolicies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompliancePercentage = table.Column<int>(type: "int", nullable: false),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    NameAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    ValidationEndtDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ValidationStartDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPolicies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppPolicyApprovers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PolicyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPolicyApprovers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPolicyApprovers_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppPolicyApprovers_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppPolicyApprovers_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AppPolicyApprovers_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPolicyApprovers_AppPolicies_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "AppPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppPolicyOwners",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PolicyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPolicyOwners", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPolicyOwners_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPolicyOwners_AppPolicies_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "AppPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppPolicyReviwers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PolicyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPolicyReviwers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPolicyReviwers_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPolicyReviwers_AppPolicies_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "AppPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryPolicy",
                columns: table => new
                {
                    PoliciesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PolicyCategoriesId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryPolicy", x => new { x.PoliciesId, x.PolicyCategoriesId });
                    table.ForeignKey(
                        name: "FK_CategoryPolicy_AppCategories_PolicyCategoriesId",
                        column: x => x.PolicyCategoriesId,
                        principalTable: "AppCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryPolicy_AppPolicies_PoliciesId",
                        column: x => x.PoliciesId,
                        principalTable: "AppPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_AttachmentId",
                table: "AppDocuments",
                column: "AttachmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_CreatorId",
                table: "AppDocuments",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_DeleterId",
                table: "AppDocuments",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_DocumentCategoryId",
                table: "AppDocuments",
                column: "DocumentCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_LastModifierId",
                table: "AppDocuments",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentCategories_CreatorId",
                table: "AppDocumentCategories",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentCategories_DeleterId",
                table: "AppDocumentCategories",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDocumentCategories_LastModifierId",
                table: "AppDocumentCategories",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_CreatorId",
                table: "AppPolicyApprovers",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_DeleterId",
                table: "AppPolicyApprovers",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_EmployeeId",
                table: "AppPolicyApprovers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_LastModifierId",
                table: "AppPolicyApprovers",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_PolicyId",
                table: "AppPolicyApprovers",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_EmployeeId",
                table: "AppPolicyOwners",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_PolicyId",
                table: "AppPolicyOwners",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_EmployeeId",
                table: "AppPolicyReviwers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_PolicyId",
                table: "AppPolicyReviwers",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryPolicy_PolicyCategoriesId",
                table: "CategoryPolicy",
                column: "PolicyCategoriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_CreatorId",
                table: "AppDocumentCategories",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_DeleterId",
                table: "AppDocumentCategories",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentCategories_AbpUsers_LastModifierId",
                table: "AppDocumentCategories",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AbpUsers_CreatorId",
                table: "AppDocuments",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AbpUsers_DeleterId",
                table: "AppDocuments",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AbpUsers_LastModifierId",
                table: "AppDocuments",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AppAttachments_AttachmentId",
                table: "AppDocuments",
                column: "AttachmentId",
                principalTable: "AppAttachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AppDocumentCategories_DocumentCategoryId",
                table: "AppDocuments",
                column: "DocumentCategoryId",
                principalTable: "AppDocumentCategories",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocumentSections_AppPolicies_DocumentId",
                table: "AppDocumentSections",
                column: "DocumentId",
                principalTable: "AppPolicies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
