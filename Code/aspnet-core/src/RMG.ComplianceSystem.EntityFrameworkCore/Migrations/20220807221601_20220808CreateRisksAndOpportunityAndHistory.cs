using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220808CreateRisksAndOpportunityAndHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "AppRisks");

            migrationBuilder.AddColumn<bool>(
                name: "Acceptance",
                table: "AppRisks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "AcceptanceApprovedby",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AffectDetailsAr",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AffectDetailsEn",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ByWhen",
                table: "AppRisks",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "CategoryId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Consequence",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ControlAssessment",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "DepartmentId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailsAr",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DetailsEn",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ExistingControl",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "GeneralDepartmentId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Likelihood",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigateActionPlan",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ObjectiveEvidence",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "OwnerId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PotentialRisk",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Responsibility",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReviewControlAssessment",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ReviewRemarks",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RiskContext",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RiskTreatmentOption",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SectorId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StandardId",
                table: "AppRisks",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StandardReference",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TreatmentRemarks",
                table: "AppRisks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WorkFlowStages",
                table: "AppRisks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppHistoryRisksAndOpportunities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RiskAndOpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppHistoryRisksAndOpportunities", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppHistoryRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "Acceptance",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "AcceptanceApprovedby",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "AffectDetailsAr",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "AffectDetailsEn",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ByWhen",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "Consequence",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ControlAssessment",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "DepartmentId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "DetailsAr",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "DetailsEn",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ExistingControl",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "GeneralDepartmentId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "Likelihood",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "MitigateActionPlan",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ObjectiveEvidence",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "PotentialRisk",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "Responsibility",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ReviewControlAssessment",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "ReviewRemarks",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "RiskContext",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "RiskTreatmentOption",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "SectorId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "StandardId",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "StandardReference",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "TreatmentRemarks",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "AppRisks");

            migrationBuilder.DropColumn(
                name: "WorkFlowStages",
                table: "AppRisks");

            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "AppRisks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
