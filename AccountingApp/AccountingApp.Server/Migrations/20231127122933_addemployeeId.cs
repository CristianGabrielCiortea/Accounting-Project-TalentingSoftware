using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class addemployeeId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "TasksDetails");

            migrationBuilder.RenameColumn(
                name: "PaymentType",
                table: "TasksDetails",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "TasksDetails",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "FixedPrice",
                table: "Tasks",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "Projects",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "TasksDetails");

            migrationBuilder.DropColumn(
                name: "FixedPrice",
                table: "Tasks");

            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "Projects");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "TasksDetails",
                newName: "PaymentType");

            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "TasksDetails",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
