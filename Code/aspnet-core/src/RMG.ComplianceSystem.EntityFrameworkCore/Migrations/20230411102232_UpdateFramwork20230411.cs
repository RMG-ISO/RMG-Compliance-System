using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RMG.ComplianceSystem.Migrations
{
    public partial class UpdateFramwork20230411 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ApproveUserId",
                table: "AppFrameworks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "AttachmentId",
                table: "AppFrameworks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<byte>(
                name: "FrameworkStatus",
                table: "AppFrameworks",
                type: "tinyint",
                nullable: false,
                defaultValue: (byte)0);

            migrationBuilder.AddColumn<string>(
                name: "LevelFirstNameAr",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelFirstNameEn",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelFourNameAr",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelFourNameEn",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelSecondNameAr",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelSecondNameEn",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelThirdNameAr",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "LevelThirdNameEn",
                table: "AppFrameworks",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ReviewUserId",
                table: "AppFrameworks",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApproveUserId",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "AttachmentId",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "FrameworkStatus",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelFirstNameAr",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelFirstNameEn",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelFourNameAr",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelFourNameEn",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelSecondNameAr",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelSecondNameEn",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelThirdNameAr",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "LevelThirdNameEn",
                table: "AppFrameworks");

            migrationBuilder.DropColumn(
                name: "ReviewUserId",
                table: "AppFrameworks");
        }
    }
}
