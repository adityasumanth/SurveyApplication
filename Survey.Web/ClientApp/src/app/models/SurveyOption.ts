import { Deserializable } from '../interfaces/deserializable.interface';


export class SurveyOption implements Deserializable {
    optionValue: string;

    deserialize(input: any) {
        (<any>Object).assign(this, input);
        return this;
    }
}
