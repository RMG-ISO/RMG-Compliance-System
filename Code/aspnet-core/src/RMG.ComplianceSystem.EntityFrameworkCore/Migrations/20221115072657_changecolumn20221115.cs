using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class changecolumn20221115 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppInternalAuditPreparations_AppFrameworks_FrameworkId",
                table: "AppInternalAuditPreparations");

            migrationBuilder.AlterColumn<Guid>(
                name: "FrameworkId",
                table: "AppInternalAuditPreparations",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_AppInternalAuditPreparations_AppFrameworks_FrameworkId",
                table: "AppInternalAuditPreparations",
                column: "FrameworkId",
                principalTable: "AppFrameworks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppInternalAuditPreparations_AppFrameworks_FrameworkId",
                table: "AppInternalAuditPreparations");

            migrationBuilder.AlterColumn<Guid>(
                name: "FrameworkId",
                table: "AppInternalAuditPreparations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AppInternalAuditPreparations_AppFrameworks_FrameworkId",
                table: "AppInternalAuditPreparations",
                column: "FrameworkId",
                principalTable: "AppFrameworks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
