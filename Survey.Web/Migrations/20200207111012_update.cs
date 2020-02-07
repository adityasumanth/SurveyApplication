using Microsoft.EntityFrameworkCore.Migrations;

namespace Survey.Web.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyFromId",
                table: "SurveyData");

            migrationBuilder.AddColumn<int>(
                name: "SurveyFormId",
                table: "SurveyData",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyFormId",
                table: "SurveyData");

            migrationBuilder.AddColumn<int>(
                name: "SurveyFromId",
                table: "SurveyData",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
