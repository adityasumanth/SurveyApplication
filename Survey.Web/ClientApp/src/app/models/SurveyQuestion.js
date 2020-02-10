"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyOption_1 = require("./SurveyOption");
var SurveyQuestion = /** @class */ (function () {
    function SurveyQuestion() {
    }
    SurveyQuestion.prototype.deserialize = function (input) {
        Object.assign(this, input);
        for (var _i = 0, _a = input.options; _i < _a.length; _i++) {
            var option = _a[_i];
            this.options.push(new SurveyOption_1.SurveyOption().deserialize(option));
        }
        return this;
    };
    return SurveyQuestion;
}());
exports.SurveyQuestion = SurveyQuestion;
//# sourceMappingURL=SurveyQuestion.js.map