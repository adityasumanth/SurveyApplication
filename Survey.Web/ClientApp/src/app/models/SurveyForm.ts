import { SurveyQuestion } from './SurveyQuestion';
import { Deserializable } from '../interfaces/deserializable.interface';

export class SurveyForm implements Deserializable {
  surveyFormId: number;
  title: string;
  surveyQuestions: SurveyQuestion[]=new Array();

  deserialize(input: any) {
    (<any>Object).assign(this, input);
    console.log(input);
    console.log(input.questions);
    for (var question of input["questions"]) {
      this.surveyQuestions.push(new SurveyQuestion().deserialize(question));
    }
    return this;
  }

}
