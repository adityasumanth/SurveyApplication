using Microsoft.EntityFrameworkCore.Migrations;

namespace Survey.Web.Migrations
{
    public partial class optionModelUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyOptions_SurveyQuestions_SurveyQuestionId",
                table: "SurveyOptions");

            migrationBuilder.DropColumn(
                name: "QuestionId",
                table: "SurveyOptions");

            migrationBuilder.AlterColumn<int>(
                name: "SurveyQuestionId",
                table: "SurveyOptions",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyOptions_SurveyQuestions_SurveyQuestionId",
                table: "SurveyOptions",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SurveyOptions_SurveyQuestions_SurveyQuestionId",
                table: "SurveyOptions");

            migrationBuilder.AlterColumn<int>(
                name: "SurveyQuestionId",
                table: "SurveyOptions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "QuestionId",
                table: "SurveyOptions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_SurveyOptions_SurveyQuestions_SurveyQuestionId",
                table: "SurveyOptions",
                column: "SurveyQuestionId",
                principalTable: "SurveyQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
