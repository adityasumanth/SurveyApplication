import { SurveyQuestion } from './SurveyQuestion';
import { SurveyOption } from './SurveyOption';
import { Deserializable } from '../interfaces/deserializable.interface';


export class SurveyAnswer implements Deserializable {
    id: number;
    surveyQuestionId: number;
    surveyOptionId: number;
    surveyDataId: number;
    deserialize(input: any) {
        (<any>Object).assign(this, input);
        return this;
    }
}
