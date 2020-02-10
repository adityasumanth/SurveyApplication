import { SurveyQuestion } from './SurveyQuestion';
import { Deserializable } from '../interfaces/deserializable.interface';

export class SurveyForm implements Deserializable {
    title: string;
    id: number;
    questions: SurveyQuestion[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.surveyQuestions.forEach(question =>
            this.questions.push(new SurveyQuestion().deserialize(question))
            );
        return this;
    }

}
