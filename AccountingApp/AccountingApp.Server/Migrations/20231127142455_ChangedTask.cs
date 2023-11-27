using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class ChangedTask : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ImportedDate",
                table: "TasksDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "TotalPrice",
                table: "TasksDetails",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImportedDate",
                table: "TasksDetails");

            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "TasksDetails");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "Tasks");
        }
    }
}
