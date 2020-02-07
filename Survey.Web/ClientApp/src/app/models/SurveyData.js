"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SurveyAnswer_1 = require("./SurveyAnswer");
var SurveyData = /** @class */ (function () {
    function SurveyData() {
    }
    SurveyData.prototype.deserialize = function (input) {
        var _this = this;
        Object.assign(this, input);
        input.Answers.forEach(function (answer) {
            return _this.Answers.push(new SurveyAnswer_1.SurveyAnswer().deserialize(answer));
        });
        return this;
    };
    return SurveyData;
}());
exports.SurveyData = SurveyData;
//# sourceMappingURL=SurveyData.js.map