"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyQuestion_1 = require("./SurveyQuestion");
var SurveyForm = /** @class */ (function () {
    function SurveyForm() {
        this.surveyQuestions = new Array();
    }
    SurveyForm.prototype.deserialize = function (input) {
        Object.assign(this, input);
        console.log(input);
        console.log(input.questions);
        for (var _i = 0, _a = input["questions"]; _i < _a.length; _i++) {
            var question = _a[_i];
            this.surveyQuestions.push(new SurveyQuestion_1.SurveyQuestion().deserialize(question));
        }
        return this;
    };
    return SurveyForm;
}());
exports.SurveyForm = SurveyForm;
//# sourceMappingURL=SurveyForm.js.map