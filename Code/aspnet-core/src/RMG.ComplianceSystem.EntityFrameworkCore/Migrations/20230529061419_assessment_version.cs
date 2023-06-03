using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class assessment_version : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DocumentedPercentage",
                table: "AppAssessments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "EffectivePercentage",
                table: "AppAssessments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ImplementedPercentage",
                table: "AppAssessments",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppAssessmentVersions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AssessmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Applicable = table.Column<byte>(type: "tinyint", nullable: true),
                    ComplianceLevel = table.Column<byte>(type: "tinyint", nullable: true),
                    ComplianceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NextComplianceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Documented = table.Column<byte>(type: "tinyint", nullable: true),
                    DocumentedPercentage = table.Column<int>(type: "int", nullable: true),
                    Implemented = table.Column<byte>(type: "tinyint", nullable: true),
                    ImplementedPercentage = table.Column<int>(type: "int", nullable: true),
                    Effective = table.Column<byte>(type: "tinyint", nullable: true),
                    EffectivePercentage = table.Column<int>(type: "int", nullable: true),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttachmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAssessmentVersions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAssessmentVersions_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppAssessmentVersions_AppAssessments_AssessmentId",
                        column: x => x.AssessmentId,
                        principalTable: "AppAssessments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessmentVersions_AssessmentId",
                table: "AppAssessmentVersions",
                column: "AssessmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessmentVersions_CreatorId",
                table: "AppAssessmentVersions",
                column: "CreatorId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppAssessmentVersions");

            migrationBuilder.DropColumn(
                name: "DocumentedPercentage",
                table: "AppAssessments");

            migrationBuilder.DropColumn(
                name: "EffectivePercentage",
                table: "AppAssessments");

            migrationBuilder.DropColumn(
                name: "ImplementedPercentage",
                table: "AppAssessments");
        }
    }
}
