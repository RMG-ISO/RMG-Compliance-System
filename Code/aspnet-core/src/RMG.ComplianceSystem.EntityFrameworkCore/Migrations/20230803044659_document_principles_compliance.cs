using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class document_principles_compliance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ComplianceResponsibleId",
                table: "AppDocuments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ComplianceScheduledEndDate",
                table: "AppDocuments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ComplianceScheduledStartDate",
                table: "AppDocuments",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_AppDocuments_ComplianceResponsibleId",
                table: "AppDocuments",
                column: "ComplianceResponsibleId");

            migrationBuilder.AddForeignKey(
                name: "FK_AppDocuments_AppEmployees_ComplianceResponsibleId",
                table: "AppDocuments",
                column: "ComplianceResponsibleId",
                principalTable: "AppEmployees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppDocuments_AppEmployees_ComplianceResponsibleId",
                table: "AppDocuments");

            migrationBuilder.DropIndex(
                name: "IX_AppDocuments_ComplianceResponsibleId",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ComplianceResponsibleId",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ComplianceScheduledEndDate",
                table: "AppDocuments");

            migrationBuilder.DropColumn(
                name: "ComplianceScheduledStartDate",
                table: "AppDocuments");
        }
    }
}
