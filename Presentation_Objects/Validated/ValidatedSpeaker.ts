import { Speaker } from "../Speaker";
import { Validated } from "./Validated";

export class ValidatedSpeaker extends Speaker implements Validated{

    constructor(firstName: string, lastName: string, email: string){
        super(firstName, lastName, email);
    }

    public validate(): boolean{
        return null
    }
}