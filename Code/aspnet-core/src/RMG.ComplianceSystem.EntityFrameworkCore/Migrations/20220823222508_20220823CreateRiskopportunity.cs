using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220823CreateRiskopportunity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.CreateTable(
                name: "AppHistoryRisksOpportunities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WorkFlowStages = table.Column<int>(type: "int", nullable: true),
                    RiskAndOpportunityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ActionDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExtraProperties = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: true),
                    CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifierId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppHistoryRisksOpportunities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppRisksOpportunities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DetailsAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DetailsEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AffectDetailsAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AffectDetailsEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    status = table.Column<int>(type: "int", nullable: true),
                    StandardId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    SectorId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    GeneralDepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    OwnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: true),
                    WorkFlowStages = table.Column<int>(type: "int", nullable: true),
                    RiskContext = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ExistingControl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ControlAssessment = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Likelihood = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Impact = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PotentialRisk = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    RiskTreatmentOption = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReEvaluation = table.Column<int>(type: "int", nullable: true),
                    Acceptance = table.Column<bool>(type: "bit", nullable: false),
                    AcceptanceApprovedby = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ReviewControlAssessment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReviewRemarks = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_AppRisksOpportunities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppRisksOpportunities_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRisksOpportunities_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRisksOpportunities_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppStaticDatatb",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NameAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<int>(type: "int", nullable: false),
                    TenantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_AppStaticDatatb", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppStaticDatatb_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppStaticDatatb_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppStaticDatatb_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppRisksTreatment",
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
                    table.PrimaryKey("PK_AppRisksTreatment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppRisksTreatment_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRisksTreatment_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRisksTreatment_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppRisksTreatment_AppRisksOpportunities_RiskOpportunityId",
                        column: x => x.RiskOpportunityId,
                        principalTable: "AppRisksOpportunities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksOpportunities_CreatorId",
                table: "AppRisksOpportunities",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksOpportunities_DeleterId",
                table: "AppRisksOpportunities",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksOpportunities_LastModifierId",
                table: "AppRisksOpportunities",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksTreatment_CreatorId",
                table: "AppRisksTreatment",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksTreatment_DeleterId",
                table: "AppRisksTreatment",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksTreatment_LastModifierId",
                table: "AppRisksTreatment",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppRisksTreatment_RiskOpportunityId",
                table: "AppRisksTreatment",
                column: "RiskOpportunityId");

            migrationBuilder.CreateIndex(
                name: "IX_AppStaticDatatb_CreatorId",
                table: "AppStaticDatatb",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppStaticDatatb_DeleterId",
                table: "AppStaticDatatb",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppStaticDatatb_LastModifierId",
                table: "AppStaticDatatb",
                column: "LastModifierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppHistoryRisksOpportunities");

            migrationBuilder.DropTable(
                name: "AppRisksTreatment");

            migrationBuilder.DropTable(
                name: "AppStaticDatatb");

            migrationBuilder.DropTable(
                name: "AppRisksOpportunities");

           
        }
    }
}
