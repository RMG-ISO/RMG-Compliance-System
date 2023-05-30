using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class domain_compliance_status : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ComplianceStatus",
                table: "AppDomains",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComplianceStatus",
                table: "AppDomains");
        }
    }
}
