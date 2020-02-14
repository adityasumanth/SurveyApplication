import { SurveyQuestion } from './SurveyQuestion';
import { Deserializable } from '../interfaces/deserializable.interface';
import { SurveyOption } from './SurveyOption';

export class SurveyForm implements Deserializable {
    title: string;
    id: number;
    questions: SurveyQuestion[];
    description: string;
    createdBy: number;
    isActive: boolean;
    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.surveyQuestions.forEach(question =>
            this.questions.push(new SurveyQuestion().deserialize(question))
            );
        return this;
    }

}

export class UpdateSurvey {
    SurveyForm: SurveyForm;
    DeletedQuestions: SurveyQuestion[];
    DeletedOptions: SurveyOption[];
}
