import { Speaker } from "../Speaker";
import { Validated } from "./Validated";

export class ValidatedSpeaker extends Speaker implements Validated{

    constructor(uid: number, firstName: string, lastName: string, email: string){
        super(uid, firstName, lastName, email);
    }

    public validate(): boolean{
        return null
    }
}