using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220825AddPropertiesToRiskAndTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StandardReference",
                table: "AppRisksTreatment",
                newName: "StandardReferenceEn");

            migrationBuilder.RenameColumn(
                name: "ObjectiveEvidence",
                table: "AppRisksTreatment",
                newName: "StandardReferenceAr");

            migrationBuilder.RenameColumn(
                name: "MitigateActionPlan",
                table: "AppRisksTreatment",
                newName: "ObjectiveEvidenceEn");

            migrationBuilder.RenameColumn(
                name: "ExistingControl",
                table: "AppRisksOpportunities",
                newName: "ExistingControlEn");

            migrationBuilder.AlterColumn<Guid>(
                name: "TenantId",
                table: "AppStaticDatatb",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<Guid>(
                name: "ParentId",
                table: "AppStaticDatatb",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigateActionPlanAr",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigateActionPlanEn",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ObjectiveEvidenceAr",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "RiskTreatmentOption",
                table: "AppRisksOpportunities",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Acceptance",
                table: "AppRisksOpportunities",
                type: "bit",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<string>(
                name: "ExistingControlAr",
                table: "AppRisksOpportunities",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ParentId",
                table: "AppStaticDatatb");

            migrationBuilder.DropColumn(
                name: "MitigateActionPlanAr",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "MitigateActionPlanEn",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "ObjectiveEvidenceAr",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "ExistingControlAr",
                table: "AppRisksOpportunities");

            migrationBuilder.RenameColumn(
                name: "StandardReferenceEn",
                table: "AppRisksTreatment",
                newName: "StandardReference");

            migrationBuilder.RenameColumn(
                name: "StandardReferenceAr",
                table: "AppRisksTreatment",
                newName: "ObjectiveEvidence");

            migrationBuilder.RenameColumn(
                name: "ObjectiveEvidenceEn",
                table: "AppRisksTreatment",
                newName: "MitigateActionPlan");

            migrationBuilder.RenameColumn(
                name: "ExistingControlEn",
                table: "AppRisksOpportunities",
                newName: "ExistingControl");

            migrationBuilder.AlterColumn<Guid>(
                name: "TenantId",
                table: "AppStaticDatatb",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RiskTreatmentOption",
                table: "AppRisksOpportunities",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<bool>(
                name: "Acceptance",
                table: "AppRisksOpportunities",
                type: "bit",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true);
        }
    }
}
