using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220906UpdateTreatementRisk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "ObjectiveEvidenceAr",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "ObjectiveEvidenceEn",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "Potential",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "ReEvaluation",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "StandardReference",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "StandardReferenceAr",
                table: "AppRisksTreatment");

            migrationBuilder.RenameColumn(
                name: "TreatmentRemarks",
                table: "AppRisksTreatment",
                newName: "ActionDetailsEn");

            migrationBuilder.RenameColumn(
                name: "StandardReferenceEn",
                table: "AppRisksTreatment",
                newName: "ActionDetailsAr");

            migrationBuilder.RenameColumn(
                name: "ByWhen",
                table: "AppRisksTreatment",
                newName: "StartDate");

            migrationBuilder.AddColumn<decimal>(
                name: "AchievementPercentage",
                table: "AppRisksTreatment",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<Guid>(
                name: "AttachmentId",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "DueDate",
                table: "AppRisksTreatment",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "AppRisksTreatment",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksTreatment_AttachmentId",
                table: "AppRisksTreatment",
                column: "AttachmentId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment",
                column: "AttachmentId",
                principalTable: "AppAttachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment");

            migrationBuilder.DropIndex(
                name: "IX_AppRisksTreatment_AttachmentId",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "AchievementPercentage",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "AttachmentId",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "DueDate",
                table: "AppRisksTreatment");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "AppRisksTreatment");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "AppRisksTreatment",
                newName: "ByWhen");

            migrationBuilder.RenameColumn(
                name: "ActionDetailsEn",
                table: "AppRisksTreatment",
                newName: "TreatmentRemarks");

            migrationBuilder.RenameColumn(
                name: "ActionDetailsAr",
                table: "AppRisksTreatment",
                newName: "StandardReferenceEn");

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

            migrationBuilder.AddColumn<string>(
                name: "ObjectiveEvidenceAr",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ObjectiveEvidenceEn",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Potential",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReEvaluation",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "StandardReference",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StandardReferenceAr",
                table: "AppRisksTreatment",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
