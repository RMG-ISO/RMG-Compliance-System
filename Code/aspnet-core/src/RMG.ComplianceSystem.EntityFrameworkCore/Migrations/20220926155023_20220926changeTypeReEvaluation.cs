using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220926changeTypeReEvaluation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReEvaluation",
                table: "AppRisksOpportunities");
            migrationBuilder.AddColumn<int>(
               name: "ReEvaluation",
               table: "AppRisksOpportunities",
               type: "int",
               nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                 name: "ReEvaluation",
                 table: "AppRisksOpportunities");
            migrationBuilder.AddColumn<int>(
               name: "ReEvaluation",
               table: "AppRisksOpportunities",
               type: "int",
               nullable: true);
        }
    }
}
