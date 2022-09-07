using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220906changeTypesTreatementRisk : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment");

            migrationBuilder.AlterColumn<Guid>(
                name: "AttachmentId",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AlterColumn<decimal>(
                name: "AchievementPercentage",
                table: "AppRisksTreatment",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment",
                column: "AttachmentId",
                principalTable: "AppAttachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment");

            migrationBuilder.AlterColumn<Guid>(
                name: "AttachmentId",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "AchievementPercentage",
                table: "AppRisksTreatment",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksTreatment_AppAttachments_AttachmentId",
                table: "AppRisksTreatment",
                column: "AttachmentId",
                principalTable: "AppAttachments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
