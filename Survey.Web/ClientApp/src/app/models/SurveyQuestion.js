"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyOption_1 = require("./SurveyOption");
var SurveyQuestion = /** @class */ (function () {
    function SurveyQuestion() {
    }
    SurveyQuestion.prototype.deserialize = function (input) {
        var _this = this;
        Object.assign(this, input);
        input.Questions.forEach(function (option) {
            return _this.options.push(new SurveyOption_1.SurveyOption().deserialize(option));
        });
        return this;
    };
    return SurveyQuestion;
}());
exports.SurveyQuestion = SurveyQuestion;
//# sourceMappingURL=SurveyQuestion.js.map