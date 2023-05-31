using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class domain_internal_assessment_dates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "InternalAssessmentEndDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InternalAssessmentStartDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InternalAssessmentEndDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "InternalAssessmentStartDate",
                table: "AppDomains",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InternalAssessmentEndDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "InternalAssessmentStartDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "InternalAssessmentEndDate",
                table: "AppDomains");

            migrationBuilder.DropColumn(
                name: "InternalAssessmentStartDate",
                table: "AppDomains");
        }
    }
}
