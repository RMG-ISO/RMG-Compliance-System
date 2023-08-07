using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RMG.ComplianceSystem.Migrations
{
    /// <inheritdoc />
    public partial class document_action_role_type : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Role",
                table: "AppDocumentActionsLog",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "AppDocumentActionsLog",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Role",
                table: "AppDocumentActionsLog");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "AppDocumentActionsLog");
        }
    }
}
