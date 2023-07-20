using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeNavigationProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyReviwers_EmployeeId",
                table: "AppPolicyReviwers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyOwners_EmployeeId",
                table: "AppPolicyOwners",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppPolicyApprovers_EmployeeId",
                table: "AppPolicyApprovers",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyApprovers_AppEmployees_EmployeeId",
                table: "AppPolicyApprovers",
                column: "EmployeeId",
                principalTable: "AppEmployees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyOwners_AppEmployees_EmployeeId",
                table: "AppPolicyOwners",
                column: "EmployeeId",
                principalTable: "AppEmployees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AppPolicyReviwers_AppEmployees_EmployeeId",
                table: "AppPolicyReviwers",
                column: "EmployeeId",
                principalTable: "AppEmployees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyApprovers_AppEmployees_EmployeeId",
                table: "AppPolicyApprovers");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyOwners_AppEmployees_EmployeeId",
                table: "AppPolicyOwners");

            migrationBuilder.DropForeignKey(
                name: "FK_AppPolicyReviwers_AppEmployees_EmployeeId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyReviwers_EmployeeId",
                table: "AppPolicyReviwers");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyOwners_EmployeeId",
                table: "AppPolicyOwners");

            migrationBuilder.DropIndex(
                name: "IX_AppPolicyApprovers_EmployeeId",
                table: "AppPolicyApprovers");
        }
    }
}
