import { SurveyQuestion } from './SurveyQuestion';
import { Deserializable } from '../interfaces/deserializable.interface';

export class SurveyForm implements Deserializable {
    title: string;
    surveyQuestions: SurveyQuestion[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.Questions.forEach(question =>
            this.surveyQuestions.push(new SurveyQuestion().deserialize(question))
            );
        return this;
    }

}
