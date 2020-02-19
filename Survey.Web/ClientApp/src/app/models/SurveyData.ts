import { SurveyAnswer } from './SurveyAnswer';
import { Deserializable } from '../interfaces/deserializable.interface';



export class SurveyData implements Deserializable {
    id: number;
    email: string;
    surveyFormId: number;
    answers: SurveyAnswer[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.Answers.forEach(answer =>
            this.answers.push(new SurveyAnswer().deserialize(answer))
        );
        return this;
    }
}
