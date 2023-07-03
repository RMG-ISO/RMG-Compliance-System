using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class framework_review_approval_dates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovalEndDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApprovalStartDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ComplianceReviewEndDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ComplianceReviewStartDate",
                table: "AppFrameworks",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApprovalEndDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ApprovalStartDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ComplianceReviewEndDate",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ComplianceReviewStartDate",
                table: "AppFrameworks");
        }
    }
}
