using Microsoft.EntityFrameworkCore.Migrations;

namespace Survey.Web.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SurveyData",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(nullable: false),
                    SurveyFormId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyData", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SurveyForms",
                columns: table => new
                {
                    SurveyFormId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyForms", x => x.SurveyFormId);
                });

            migrationBuilder.CreateTable(
                name: "SurveyAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyQuestionId = table.Column<int>(nullable: false),
                    SurveyOptionId = table.Column<int>(nullable: false),
                    SurveyDataId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyAnswers_SurveyData_SurveyDataId",
                        column: x => x.SurveyDataId,
                        principalTable: "SurveyData",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyQuestions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Question = table.Column<string>(nullable: false),
                    Type = table.Column<int>(nullable: false),
                    SurveyFormId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyQuestions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyQuestions_SurveyForms_SurveyFormId",
                        column: x => x.SurveyFormId,
                        principalTable: "SurveyForms",
                        principalColumn: "SurveyFormId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SurveyOptions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SurveyQuestionId = table.Column<int>(nullable: false),
                    OptionValue = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SurveyOptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SurveyOptions_SurveyQuestions_SurveyQuestionId",
                        column: x => x.SurveyQuestionId,
                        principalTable: "SurveyQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SurveyAnswers_SurveyDataId",
                table: "SurveyAnswers",
                column: "SurveyDataId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyOptions_SurveyQuestionId",
                table: "SurveyOptions",
                column: "SurveyQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_SurveyQuestions_SurveyFormId",
                table: "SurveyQuestions",
                column: "SurveyFormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SurveyAnswers");

            migrationBuilder.DropTable(
                name: "SurveyOptions");

            migrationBuilder.DropTable(
                name: "SurveyData");

            migrationBuilder.DropTable(
                name: "SurveyQuestions");

            migrationBuilder.DropTable(
                name: "SurveyForms");
        }
    }
}
