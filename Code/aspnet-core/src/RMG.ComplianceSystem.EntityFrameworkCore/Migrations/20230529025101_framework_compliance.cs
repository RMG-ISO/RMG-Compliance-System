using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class framework_compliance : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComplianceStatus",
                table: "AppFrameworks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "SelfAssessmentStartDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ResponsibleId",
                table: "AppDomains",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppDomains_ResponsibleId",
                table: "AppDomains",
                column: "ResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDomains_AppEmployees_ResponsibleId",
                table: "AppDomains",
                column: "ResponsibleId",
                principalTable: "AppEmployees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDomains_AppEmployees_ResponsibleId",
                table: "AppDomains");

            migrationBuilder.DropIndex(
                name: "IX_AppDomains_ResponsibleId",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "ComplianceStatus",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "SelfAssessmentStartDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ResponsibleId",
                table: "AppDomains");
        }
    }
}
