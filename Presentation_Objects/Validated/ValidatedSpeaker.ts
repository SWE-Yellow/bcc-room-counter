import { Speaker } from "../Speaker";
import { Validated, Validator } from "./Validated";

export class ValidatedSpeaker extends Speaker implements Validated{

    constructor(uid: any, firstName: string, lastName: string, email: string){
        super(uid, firstName, lastName, email);

    }

    public validate(): boolean {
        if (!Validator.isStringValid(this.firstName))
            return false
        if (!Validator.isStringValid(this.lastName))
            return false
        if (!Validator.isStringValid(this.email))
            return false
        return true
    }
}