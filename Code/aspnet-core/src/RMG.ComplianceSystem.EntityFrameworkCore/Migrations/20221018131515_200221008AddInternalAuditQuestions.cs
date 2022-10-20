using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _200221008AddInternalAuditQuestions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppInternalAuditMenuQuestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MenuTextEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MenuTextAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsEditable = table.Column<bool>(type: "bit", nullable: false),
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
                    table.PrimaryKey("PK_AppInternalAuditMenuQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditMenuQuestions_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditMenuQuestions_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditMenuQuestions_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditMenuQuestions_AppFrameworks_FrameworkId",
                        column: x => x.FrameworkId,
                        principalTable: "AppFrameworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppInternalAuditQuestionLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InternalAuditMenuQuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    InternalAuditQuestionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
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
                    table.PrimaryKey("PK_AppInternalAuditQuestionLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestionLists_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestionLists_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestionLists_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AppInternalAuditQuestions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionTextEn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    QuestionTextAr = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_AppInternalAuditQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestions_AbpUsers_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestions_AbpUsers_DeleterId",
                        column: x => x.DeleterId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestions_AbpUsers_LastModifierId",
                        column: x => x.LastModifierId,
                        principalTable: "AbpUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppInternalAuditQuestions_AppFrameworks_FrameworkId",
                        column: x => x.FrameworkId,
                        principalTable: "AppFrameworks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditMenuQuestions_CreatorId",
                table: "AppInternalAuditMenuQuestions",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditMenuQuestions_DeleterId",
                table: "AppInternalAuditMenuQuestions",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditMenuQuestions_FrameworkId",
                table: "AppInternalAuditMenuQuestions",
                column: "FrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditMenuQuestions_LastModifierId",
                table: "AppInternalAuditMenuQuestions",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestionLists_CreatorId",
                table: "AppInternalAuditQuestionLists",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestionLists_DeleterId",
                table: "AppInternalAuditQuestionLists",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestionLists_LastModifierId",
                table: "AppInternalAuditQuestionLists",
                column: "LastModifierId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestions_CreatorId",
                table: "AppInternalAuditQuestions",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestions_DeleterId",
                table: "AppInternalAuditQuestions",
                column: "DeleterId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestions_FrameworkId",
                table: "AppInternalAuditQuestions",
                column: "FrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_AppInternalAuditQuestions_LastModifierId",
                table: "AppInternalAuditQuestions",
                column: "LastModifierId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppInternalAuditMenuQuestions");

            migrationBuilder.DropTable(
                name: "AppInternalAuditQuestionLists");

            migrationBuilder.DropTable(
                name: "AppInternalAuditQuestions");
        }
    }
}
