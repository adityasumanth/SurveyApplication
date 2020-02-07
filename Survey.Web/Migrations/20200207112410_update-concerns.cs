using Microsoft.EntityFrameworkCore.Migrations;

namespace Survey.Web.Migrations
{
    public partial class updateconcerns : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SurveyFormId",
                table: "SurveyAnswers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SurveyFormId",
                table: "SurveyAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
