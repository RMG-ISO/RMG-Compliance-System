using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class framework_priority : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "HasPriority",
                table: "AppFrameworks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<byte>(
                name: "Priority",
                table: "AppAssessmentVersions",
                type: "tinyint",
                nullable: true);

            migrationBuilder.AddColumn<byte>(
                name: "Priority",
                table: "AppAssessments",
                type: "tinyint",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HasPriority",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "AppAssessmentVersions");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "AppAssessments");
        }
    }
}
