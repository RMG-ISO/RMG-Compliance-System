using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class AddAuditPreparation20221107 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppInternalAuditors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InternalAuditPreparationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsAuditor = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_AppInternalAuditors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditors_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditors_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditors_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppInternalAuditPreparations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuditCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditTitleEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditTitleAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditDescriptionEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditDescriptionAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditFieldEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditFieldAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditSetpsEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditSetpsAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditGoalsEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuditGoalsAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RiskOpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FrameworkId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_AppInternalAuditPreparations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AppDepartments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "AppDepartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AppFrameworks_FrameworkId",
                        column: x => x.FrameworkId,
                        principalTable: "AppFrameworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditPreparations_AppRisksOpportunities_RiskOpportunityId",
                        column: x => x.RiskOpportunityId,
                        principalTable: "AppRisksOpportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditors_CreatorId",
                table: "AppInternalAuditors",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditors_DeleterId",
                table: "AppInternalAuditors",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditors_LastModifierId",
                table: "AppInternalAuditors",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_CreatorId",
                table: "AppInternalAuditPreparations",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_DeleterId",
                table: "AppInternalAuditPreparations",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_DepartmentId",
                table: "AppInternalAuditPreparations",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_FrameworkId",
                table: "AppInternalAuditPreparations",
                column: "FrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_LastModifierId",
                table: "AppInternalAuditPreparations",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditPreparations_RiskOpportunityId",
                table: "AppInternalAuditPreparations",
                column: "RiskOpportunityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppInternalAuditors");

            migrationBuilder.DropTable(
                name: "AppInternalAuditPreparations");
        }
    }
}
