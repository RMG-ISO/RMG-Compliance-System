using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220808updateRisksAndOpportunity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRisks_AbpUsers_CreatorId",
                table: "AppRisks");

            migrationBuilder.DropForeignKey(
                name: "FK_AppRisks_AbpUsers_DeleterId",
                table: "AppRisks");

            migrationBuilder.DropForeignKey(
                name: "FK_AppRisks_AbpUsers_LastModifierId",
                table: "AppRisks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRisks",
                table: "AppRisks");

            migrationBuilder.RenameTable(
                name: "AppRisks",
                newName: "AppRisksAndOpportunities");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisks_LastModifierId",
                table: "AppRisksAndOpportunities",
                newName: "IX_AppRisksAndOpportunities_LastModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisks_DeleterId",
                table: "AppRisksAndOpportunities",
                newName: "IX_AppRisksAndOpportunities_DeleterId");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisks_CreatorId",
                table: "AppRisksAndOpportunities",
                newName: "IX_AppRisksAndOpportunities_CreatorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRisksAndOpportunities",
                table: "AppRisksAndOpportunities",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_CreatorId",
                table: "AppRisksAndOpportunities",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_DeleterId",
                table: "AppRisksAndOpportunities",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_LastModifierId",
                table: "AppRisksAndOpportunities",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_CreatorId",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_DeleterId",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropForeignKey(
                name: "FK_AppRisksAndOpportunities_AbpUsers_LastModifierId",
                table: "AppRisksAndOpportunities");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppRisksAndOpportunities",
                table: "AppRisksAndOpportunities");

            migrationBuilder.RenameTable(
                name: "AppRisksAndOpportunities",
                newName: "AppRisks");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisksAndOpportunities_LastModifierId",
                table: "AppRisks",
                newName: "IX_AppRisks_LastModifierId");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisksAndOpportunities_DeleterId",
                table: "AppRisks",
                newName: "IX_AppRisks_DeleterId");

            migrationBuilder.RenameIndex(
                name: "IX_AppRisksAndOpportunities_CreatorId",
                table: "AppRisks",
                newName: "IX_AppRisks_CreatorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppRisks",
                table: "AppRisks",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisks_AbpUsers_CreatorId",
                table: "AppRisks",
                column: "CreatorId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisks_AbpUsers_DeleterId",
                table: "AppRisks",
                column: "DeleterId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AppRisks_AbpUsers_LastModifierId",
                table: "AppRisks",
                column: "LastModifierId",
                principalTable: "AbpUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
