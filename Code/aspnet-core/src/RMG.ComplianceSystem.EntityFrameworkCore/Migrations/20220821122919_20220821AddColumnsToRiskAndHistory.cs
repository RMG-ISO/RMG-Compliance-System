using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220821AddColumnsToRiskAndHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Consequence",
                table: "AppRisksAndOpportunities",
                newName: "Impact");

            migrationBuilder.AddColumn<int>(
                name: "status",
                table: "AppRisksAndOpportunities",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "WorkFlowStages",
                table: "AppHistoryRisksAndOpportunities",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "status",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "WorkFlowStages",
                table: "AppHistoryRisksAndOpportunities");

            migrationBuilder.RenameColumn(
                name: "Impact",
                table: "AppRisksAndOpportunities",
                newName: "Consequence");
        }
    }
}
