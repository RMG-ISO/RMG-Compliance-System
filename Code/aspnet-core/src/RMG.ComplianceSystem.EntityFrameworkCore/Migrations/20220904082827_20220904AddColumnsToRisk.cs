using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220904AddColumnsToRisk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
             name: "Likelihood",
             table: "AppRisksOpportunities");
            migrationBuilder.DropColumn(
                name: "PotentialRisk",
                table: "AppRisksOpportunities");
            migrationBuilder.DropColumn(
              name: "Impact",
              table: "AppRisksOpportunities");

            migrationBuilder.AddColumn<int>(
             name: "Likelihood",
             table: "AppRisksOpportunities",
             type: "int",
             nullable: true);

            migrationBuilder.AddColumn<int>(
              name: "Impact",
              table: "AppRisksOpportunities",
              type: "int",
              nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsTreatment",
                table: "AppRisksOpportunities",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberMax",
                table: "AppRisksOpportunities",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Potential",
                table: "AppRisksOpportunities",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
             name: "Likelihood",
             table: "AppRisksOpportunities");
            migrationBuilder.DropColumn(
                name: "PotentialRisk",
                table: "AppRisksOpportunities");
            migrationBuilder.DropColumn(
              name: "Impact",
              table: "AppRisksOpportunities");

            migrationBuilder.AddColumn<int>(
             name: "Likelihood",
             table: "AppRisksOpportunities",
             type: "int",
             nullable: true);

            migrationBuilder.AddColumn<int>(
              name: "Impact",
              table: "AppRisksOpportunities",
              type: "int",
              nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsTreatment",
                table: "AppRisksOpportunities",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NumberMax",
                table: "AppRisksOpportunities",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Potential",
                table: "AppRisksOpportunities",
                type: "int",
                nullable: true);
        }
    }
}
