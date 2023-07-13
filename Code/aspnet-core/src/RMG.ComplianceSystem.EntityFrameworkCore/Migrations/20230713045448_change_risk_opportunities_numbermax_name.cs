using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class change_risk_opportunities_numbermax_name : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberMax",
                table: "AppRisksOpportunities",
                newName: "NumberMatrix");

            migrationBuilder.AlterColumn<Guid>(
                name: "AttachmentId",
                table: "AppFrameworks",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberMatrix",
                table: "AppRisksOpportunities",
                newName: "NumberMax");

            migrationBuilder.AlterColumn<Guid>(
                name: "AttachmentId",
                table: "AppFrameworks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }
    }
}
