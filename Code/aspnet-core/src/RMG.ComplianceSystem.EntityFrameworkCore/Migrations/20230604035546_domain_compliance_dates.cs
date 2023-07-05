using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class domain_compliance_dates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewEndDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewStartDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewEndDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReviewStartDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SelfAssessmentEndDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SelfAssessmentStartDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReviewEndDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ReviewStartDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ReviewEndDate",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "ReviewStartDate",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "SelfAssessmentEndDate",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "SelfAssessmentStartDate",
                table: "AppDomains");
        }
    }
}
