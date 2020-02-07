import { SurveyAnswer } from './SurveyAnswer';
import { Deserializable } from '../interfaces/deserializable.interface';



export class SurveyData implements Deserializable {
    id: number;
    email: string;
    surveyFormID: number;
    Answers: SurveyAnswer[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.Answers.forEach(answer =>
            this.Answers.push(new SurveyAnswer().deserialize(answer))
        );
        return this;
    }
}
