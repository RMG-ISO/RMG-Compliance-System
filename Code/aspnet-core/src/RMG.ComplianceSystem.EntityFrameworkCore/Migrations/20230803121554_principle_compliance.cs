using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class principle_compliance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Status",
                table: "AppPrinciples",
                newName: "ComplianceStatus");

            migrationBuilder.AddColumn<Guid>(
                name: "AttachmentId",
                table: "AppPrinciples",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ComplianceComment",
                table: "AppPrinciples",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttachmentId",
                table: "AppPrinciples");

            migrationBuilder.DropColumn(
                name: "ComplianceComment",
                table: "AppPrinciples");

            migrationBuilder.RenameColumn(
                name: "ComplianceStatus",
                table: "AppPrinciples",
                newName: "Status");
        }
    }
}
