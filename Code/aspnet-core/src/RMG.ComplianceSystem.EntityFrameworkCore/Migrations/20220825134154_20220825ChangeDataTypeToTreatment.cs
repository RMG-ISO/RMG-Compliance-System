using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class _20220825ChangeDataTypeToTreatment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "ReEvaluation",
            //    table: "AppRisksTreatment",
            //    type: "uniqueidentifier",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int",
            //    oldNullable: true);
            migrationBuilder.DropColumn(
              name: "ReEvaluation",
              table: "AppRisksTreatment");
            migrationBuilder.DropColumn(
             name: "ReEvaluation",
             table: "AppRisksOpportunities");

            migrationBuilder.AddColumn<Guid>(
                name: "ReEvaluation",
                table: "AppRisksTreatment",
                type: "uniqueidentifier",
                nullable: true);
            migrationBuilder.AddColumn<Guid>(
               name: "ReEvaluation",
               table: "AppRisksOpportunities",
               type: "uniqueidentifier",
               nullable: true);

            //migrationBuilder.AlterColumn<Guid>(
            //    name: "ReEvaluation",
            //    table: "AppRisksOpportunities",
            //    type: "uniqueidentifier",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int",
            //    oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
              name: "ReEvaluation",
              table: "AppRisksTreatment");
            migrationBuilder.DropColumn(
             name: "ReEvaluation",
             table: "AppRisksOpportunities");
            //migrationBuilder.AlterColumn<int>(
            //    name: "ReEvaluation",
            //    table: "AppRisksTreatment",
            //    type: "int",
            //    nullable: true,
            //    oldClrType: typeof(Guid),
            //    oldType: "uniqueidentifier",
            //    oldNullable: true);

            //migrationBuilder.AlterColumn<int>(
            //    name: "ReEvaluation",
            //    table: "AppRisksOpportunities",
            //    type: "int",
            //    nullable: true,
            //    oldClrType: typeof(Guid),
            //    oldType: "uniqueidentifier",
            //    oldNullable: true);
        }
    }
}
