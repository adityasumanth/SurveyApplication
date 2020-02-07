import { SurveyAnswer } from './SurveyAnswer';
import { SurveyForm } from './SurveyForm';

export class SurveyData{
    id: number;
    email: string;
    surveyForm: SurveyForm;
    surveyAnswers: SurveyAnswer[];
}
