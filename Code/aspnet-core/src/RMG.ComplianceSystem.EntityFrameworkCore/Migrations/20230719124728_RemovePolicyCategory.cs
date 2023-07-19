using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class RemovePolicyCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCategories_AppPolicies_PolicyId",
                table: "AppCategories");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_CreatorId",
                table: "AppPolicyOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_DeleterId",
                table: "AppPolicyOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_LastModifierId",
                table: "AppPolicyOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_CreatorId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_DeleterId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_LastModifierId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropTable(
                name: "AppPoliciesCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyReviwers_CreatorId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyReviwers_DeleterId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyReviwers_LastModifierId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyOwners_CreatorId",
                table: "AppPolicyOwners");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyOwners_DeleterId",
                table: "AppPolicyOwners");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyOwners_LastModifierId",
                table: "AppPolicyOwners");

            migrationBuilder.DropIndex(
                name: "IX_AppCategories_PolicyId",
                table: "AppCategories");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "AppPolicyReviwers");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppPolicyReviwers");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "AppPolicyReviwers");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppPolicyReviwers");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "AppPolicyOwners");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppPolicyOwners");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppPolicyOwners");

            migrationBuilder.DropColumn(
                name: "ExtraProperties",
                table: "AppPolicyOwners");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppPolicyOwners");

            migrationBuilder.DropColumn(
                name: "PolicyId",
                table: "AppCategories");

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
                name: "IX_CategoryPolicy_PolicyCategoriesId",
                table: "CategoryPolicy",
                column: "PolicyCategoriesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryPolicy");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "AppPolicyReviwers",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppPolicyReviwers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppPolicyReviwers",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "AppPolicyReviwers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppPolicyReviwers",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "AppPolicyOwners",
                type: "nvarchar(40)",
                maxLength: 40,
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppPolicyOwners",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppPolicyOwners",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExtraProperties",
                table: "AppPolicyOwners",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppPolicyOwners",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "PolicyId",
                table: "AppCategories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppPoliciesCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PolicyCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PolicyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppPoliciesCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppPoliciesCategories_AppCategories_PolicyCategoryId",
                        column: x => x.PolicyCategoryId,
                        principalTable: "AppCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppPoliciesCategories_AppPolicies_PolicyId",
                        column: x => x.PolicyId,
                        principalTable: "AppPolicies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_CreatorId",
                table: "AppPolicyReviwers",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_DeleterId",
                table: "AppPolicyReviwers",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_LastModifierId",
                table: "AppPolicyReviwers",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_CreatorId",
                table: "AppPolicyOwners",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_DeleterId",
                table: "AppPolicyOwners",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_LastModifierId",
                table: "AppPolicyOwners",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppCategories_PolicyId",
                table: "AppCategories",
                column: "PolicyId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPoliciesCategories_PolicyCategoryId",
                table: "AppPoliciesCategories",
                column: "PolicyCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPoliciesCategories_PolicyId",
                table: "AppPoliciesCategories",
                column: "PolicyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppCategories_AppPolicies_PolicyId",
                table: "AppCategories",
                column: "PolicyId",
                principalTable: "AppPolicies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_CreatorId",
                table: "AppPolicyOwners",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_DeleterId",
                table: "AppPolicyOwners",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyOwners_AbpUsers_LastModifierId",
                table: "AppPolicyOwners",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_CreatorId",
                table: "AppPolicyReviwers",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_DeleterId",
                table: "AppPolicyReviwers",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyReviwers_AbpUsers_LastModifierId",
                table: "AppPolicyReviwers",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id");
        }
    }
}
