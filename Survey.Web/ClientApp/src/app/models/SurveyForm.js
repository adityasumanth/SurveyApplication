"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyQuestion_1 = require("./SurveyQuestion");
var SurveyForm = /** @class */ (function () {
    function SurveyForm() {
    }
    SurveyForm.prototype.deserialize = function (input) {
        var _this = this;
        Object.assign(this, input);
        input.surveyQuestions.forEach(function (question) {
            return _this.questions.push(new SurveyQuestion_1.SurveyQuestion().deserialize(question));
        });
        return this;
    };
    return SurveyForm;
}());
exports.SurveyForm = SurveyForm;
var UpdateSurvey = /** @class */ (function () {
    function UpdateSurvey() {
    }
    return UpdateSurvey;
}());
exports.UpdateSurvey = UpdateSurvey;
//# sourceMappingURL=SurveyForm.js.map