import { SurveyOption } from './SurveyOption';
import { Deserializable } from '../interfaces/deserializable.interface';

export class SurveyQuestion implements Deserializable {
  question: string;
  type: number;
  options: SurveyOption[]=new Array();

  deserialize(input: any) {
    (<any>Object).assign(this, input);
    for (var option of input.options) {
      this.options.push(new SurveyOption().deserialize(option));
    }
    return this;
  }
}
