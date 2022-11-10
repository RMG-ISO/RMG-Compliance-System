using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class ApproveAudit20221110 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ApproveBy",
                table: "AppInternalAuditPreparations",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CausesRefuse",
                table: "AppInternalAuditPreparations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsApprove",
                table: "AppInternalAuditPreparations",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "approveDate",
                table: "AppInternalAuditPreparations",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApproveBy",
                table: "AppInternalAuditPreparations");

            migrationBuilder.DropColumn(
                name: "CausesRefuse",
                table: "AppInternalAuditPreparations");

            migrationBuilder.DropColumn(
                name: "IsApprove",
                table: "AppInternalAuditPreparations");

            migrationBuilder.DropColumn(
                name: "approveDate",
                table: "AppInternalAuditPreparations");
        }
    }
}
