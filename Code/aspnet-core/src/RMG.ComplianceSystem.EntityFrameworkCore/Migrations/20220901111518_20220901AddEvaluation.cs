using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220901AddEvaluation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChangeStatus",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Impact",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Likelihood",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Potential",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChangeStatus",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "Impact",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "Likelihood",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "Potential",
                table: "AppRisksTreatment");
        }
    }
}
