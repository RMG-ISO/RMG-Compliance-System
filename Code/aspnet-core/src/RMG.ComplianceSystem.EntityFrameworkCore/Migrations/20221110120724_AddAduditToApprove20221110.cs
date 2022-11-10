using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class AddAduditToApprove20221110 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "InternalAuditId",
                table: "AppInternalAuditApproves",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "InternalAuditPreparationId",
                table: "AppInternalAuditApproves",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditApproves_InternalAuditPreparationId",
                table: "AppInternalAuditApproves",
                column: "InternalAuditPreparationId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppInternalAuditApproves_AppInternalAuditPreparations_InternalAuditPreparationId",
                table: "AppInternalAuditApproves",
                column: "InternalAuditPreparationId",
                principalTable: "AppInternalAuditPreparations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppInternalAuditApproves_AppInternalAuditPreparations_InternalAuditPreparationId",
                table: "AppInternalAuditApproves");

            migrationBuilder.DropIndex(
                name: "IX_AppInternalAuditApproves_InternalAuditPreparationId",
                table: "AppInternalAuditApproves");

            migrationBuilder.DropColumn(
                name: "InternalAuditId",
                table: "AppInternalAuditApproves");

            migrationBuilder.DropColumn(
                name: "InternalAuditPreparationId",
                table: "AppInternalAuditApproves");
        }
    }
}
