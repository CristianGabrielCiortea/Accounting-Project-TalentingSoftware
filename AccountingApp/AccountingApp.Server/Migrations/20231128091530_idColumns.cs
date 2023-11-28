using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AccountingApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class idColumns : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TasksDetails_TaskId",
                table: "TasksDetails");

            migrationBuilder.CreateIndex(
                name: "IX_TasksDetails_TaskId",
                table: "TasksDetails",
                column: "TaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_TasksDetails_TaskId",
                table: "TasksDetails");

            migrationBuilder.CreateIndex(
                name: "IX_TasksDetails_TaskId",
                table: "TasksDetails",
                column: "TaskId",
                unique: true);
        }
    }
}
