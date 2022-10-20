using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20221020AddQuestionExplainToAuditQuestion : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "QuestionExplainAr",
                table: "AppInternalAuditQuestions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionExplainEn",
                table: "AppInternalAuditQuestions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "QuestionExplainAr",
                table: "AppInternalAuditQuestions");

            migrationBuilder.DropColumn(
                name: "QuestionExplainEn",
                table: "AppInternalAuditQuestions");
        }
    }
}
