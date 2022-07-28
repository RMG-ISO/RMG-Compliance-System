using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220725AddPolicyAndpolicyCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "AppPolicies");

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "AppPolicies",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "DeleterId",
                table: "AppPolicies",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DeletionTime",
                table: "AppPolicies",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "AppPolicies",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "PolicyCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PolicyCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PolicyCategories_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PolicyCategories_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PolicyCategories_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicies_CreatorId",
                table: "AppPolicies",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicies_DeleterId",
                table: "AppPolicies",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicies_LastModifierId",
                table: "AppPolicies",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyCategories_CreatorId",
                table: "PolicyCategories",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyCategories_DeleterId",
                table: "PolicyCategories",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_PolicyCategories_LastModifierId",
                table: "PolicyCategories",
                column: "LastModifierId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicies_AbpUsers_CreatorId",
                table: "AppPolicies",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicies_AbpUsers_DeleterId",
                table: "AppPolicies",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicies_AbpUsers_LastModifierId",
                table: "AppPolicies",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicies_AbpUsers_CreatorId",
                table: "AppPolicies");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicies_AbpUsers_DeleterId",
                table: "AppPolicies");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicies_AbpUsers_LastModifierId",
                table: "AppPolicies");

            migrationBuilder.DropTable(
                name: "PolicyCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicies_CreatorId",
                table: "AppPolicies");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicies_DeleterId",
                table: "AppPolicies");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicies_LastModifierId",
                table: "AppPolicies");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AppPolicies");

            migrationBuilder.DropColumn(
                name: "DeleterId",
                table: "AppPolicies");

            migrationBuilder.DropColumn(
                name: "DeletionTime",
                table: "AppPolicies");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "AppPolicies");

            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "AppPolicies",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
