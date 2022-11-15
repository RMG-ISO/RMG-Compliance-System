using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class changeTypecolumn20221115 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppInternalAuditPreparations_AppRisksOpportunities_RiskOpportunityId",
                table: "AppInternalAuditPreparations");

            migrationBuilder.AlterColumn<Guid>(
                name: "RiskOpportunityId",
                table: "AppInternalAuditPreparations",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_AppInternalAuditPreparations_AppRisksOpportunities_RiskOpportunityId",
                table: "AppInternalAuditPreparations",
                column: "RiskOpportunityId",
                principalTable: "AppRisksOpportunities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppInternalAuditPreparations_AppRisksOpportunities_RiskOpportunityId",
                table: "AppInternalAuditPreparations");

            migrationBuilder.AlterColumn<Guid>(
                name: "RiskOpportunityId",
                table: "AppInternalAuditPreparations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppInternalAuditPreparations_AppRisksOpportunities_RiskOpportunityId",
                table: "AppInternalAuditPreparations",
                column: "RiskOpportunityId",
                principalTable: "AppRisksOpportunities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
