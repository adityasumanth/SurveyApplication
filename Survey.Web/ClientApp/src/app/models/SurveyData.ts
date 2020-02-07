import { SurveyAnswer } from './SurveyAnswer';
import { Deserializable } from '../interfaces/deserializable.interface';



export class SurveyData implements Deserializable {
    email: string;
    surveyForm: number;
    surveyAnswers: SurveyAnswer[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.Answers.forEach(answer =>
            this.surveyAnswers.push(new SurveyAnswer().deserialize(answer))
        );
        return this;
    }
}
