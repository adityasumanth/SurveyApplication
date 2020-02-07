import { SurveyOption } from './SurveyOption';
import { Deserializable } from '../interfaces/deserializable.interface';

export class SurveyQuestion implements Deserializable {
    question: string;
    type: number;
    options: SurveyOption[];

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        input.Questions.forEach(option =>
            this.options.push(new SurveyOption().deserialize(option))
            );
        return this;
    }
}
