using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220809createStaticDataTb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                name: "AppStaticDatatb");
        }
    }
}
