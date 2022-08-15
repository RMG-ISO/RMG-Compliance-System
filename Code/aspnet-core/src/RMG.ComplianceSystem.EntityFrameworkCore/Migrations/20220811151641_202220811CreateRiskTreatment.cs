using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _202220811CreateRiskTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ByWhen",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "MitigateActionPlan",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "ObjectiveEvidence",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "Responsibility",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "StandardReference",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropColumn(
                name: "TreatmentRemarks",
                table: "AppRisksAndOpportunities");

            migrationBuilder.AddColumn<int>(
                name: "ReEvaluation",
                table: "AppRisksAndOpportunities",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppRiskTreatments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RiskOpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MitigateActionPlan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StandardReference = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ObjectiveEvidence = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Responsibility = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ByWhen = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TreatmentRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReEvaluation = table.Column<int>(type: "int", nullable: true),
                    RiskAndOpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
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
                    table.PrimaryKey("PK_AppRiskTreatments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppRiskTreatments_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRiskTreatments_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRiskTreatments_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRiskTreatments_AppRisksAndOpportunities_RiskAndOpportunityId",
                        column: x => x.RiskAndOpportunityId,
                        principalTable: "AppRisksAndOpportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppRiskTreatments_CreatorId",
                table: "AppRiskTreatments",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRiskTreatments_DeleterId",
                table: "AppRiskTreatments",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRiskTreatments_LastModifierId",
                table: "AppRiskTreatments",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRiskTreatments_RiskAndOpportunityId",
                table: "AppRiskTreatments",
                column: "RiskAndOpportunityId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppRiskTreatments");

            migrationBuilder.DropColumn(
                name: "ReEvaluation",
                table: "AppRisksAndOpportunities");

            migrationBuilder.AddColumn<DateTime>(
                name: "ByWhen",
                table: "AppRisksAndOpportunities",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MitigateActionPlan",
                table: "AppRisksAndOpportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ObjectiveEvidence",
                table: "AppRisksAndOpportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "Responsibility",
                table: "AppRisksAndOpportunities",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StandardReference",
                table: "AppRisksAndOpportunities",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TreatmentRemarks",
                table: "AppRisksAndOpportunities",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
