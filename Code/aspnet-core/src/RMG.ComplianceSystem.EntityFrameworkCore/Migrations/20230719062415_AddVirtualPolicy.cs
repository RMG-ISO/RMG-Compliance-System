using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddVirtualPolicy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryPolicy");

            migrationBuilder.AddColumn<Guid>(
                name: "PolicyId",
                table: "AppCategories",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppCategories_PolicyId",
                table: "AppCategories",
                column: "PolicyId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppCategories_AppPolicies_PolicyId",
                table: "AppCategories",
                column: "PolicyId",
                principalTable: "AppPolicies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppCategories_AppPolicies_PolicyId",
                table: "AppCategories");

            migrationBuilder.DropIndex(
                name: "IX_AppCategories_PolicyId",
                table: "AppCategories");

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
    }
}
