import { Speaker } from "../Speaker";
import { Validated, Validator } from "./Validated";

export class ValidatedSpeaker extends Speaker implements Validated{

    constructor(uid: number, name:string, email: string){
        super(uid, name, email);

    }

    public validate(): boolean {
        if (!Validator.isStringValid(this.name))
            return false
        if (!Validator.isStringValid(this.email) || !Validator.isEmailValid(this.email))
            return false
        return true
    }
}