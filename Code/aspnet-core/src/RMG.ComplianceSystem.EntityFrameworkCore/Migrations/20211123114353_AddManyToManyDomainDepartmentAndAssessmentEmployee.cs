using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class AddManyToManyDomainDepartmentAndAssessmentEmployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDomains_AppDepartments_DepartmentId",
                table: "AppDomains");

            migrationBuilder.DropIndex(
                name: "IX_AppDomains_DepartmentId",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "AppDomains");

            migrationBuilder.CreateTable(
                name: "AppAssessmentEmployees",
                columns: table => new
                {
                    AssessmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAssessmentEmployees", x => new { x.AssessmentId, x.EmployeeId });
                    table.ForeignKey(
                        name: "FK_AppAssessmentEmployees_AppAssessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "AppAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppAssessmentEmployees_AppEmployees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "AppEmployees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppDomainDepartments",
                columns: table => new
                {
                    DomainId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppDomainDepartments", x => new { x.DomainId, x.DepartmentId });
                    table.ForeignKey(
                        name: "FK_AppDomainDepartments_AppDepartments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "AppDepartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppDomainDepartments_AppDomains_DomainId",
                        column: x => x.DomainId,
                        principalTable: "AppDomains",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessmentEmployees_EmployeeId",
                table: "AppAssessmentEmployees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_AppDomainDepartments_DepartmentId",
                table: "AppDomainDepartments",
                column: "DepartmentId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppAssessmentEmployees");

            migrationBuilder.DropTable(
                name: "AppDomainDepartments");

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "AppDomains",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppDomains_DepartmentId",
                table: "AppDomains",
                column: "DepartmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDomains_AppDepartments_DepartmentId",
                table: "AppDomains",
                column: "DepartmentId",
                principalTable: "AppDepartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
