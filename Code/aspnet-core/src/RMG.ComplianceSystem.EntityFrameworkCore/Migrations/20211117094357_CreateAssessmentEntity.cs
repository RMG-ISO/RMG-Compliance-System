using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class CreateAssessmentEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppAssessments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ControlId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Applicable = table.Column<byte>(type: "tinyint", nullable: false),
                    ComplianceLevel = table.Column<byte>(type: "tinyint", nullable: false),
                    ComplianceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    NextComplianceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Documented = table.Column<byte>(type: "tinyint", nullable: false),
                    Implemented = table.Column<byte>(type: "tinyint", nullable: false),
                    Effective = table.Column<byte>(type: "tinyint", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AttaChmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    DeleterId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppAssessments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppAssessments_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppAssessments_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppAssessments_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppAssessments_AppControls_ControlId",
                        column: x => x.ControlId,
                        principalTable: "AppControls",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessments_ControlId",
                table: "AppAssessments",
                column: "ControlId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessments_CreatorId",
                table: "AppAssessments",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessments_DeleterId",
                table: "AppAssessments",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppAssessments_LastModifierId",
                table: "AppAssessments",
                column: "LastModifierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppAssessments");
        }
    }
}
