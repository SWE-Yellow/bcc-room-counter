import { Speaker } from "../Speaker";
import { Validated } from "./Validated";

export class ValidatedSpeaker extends Speaker implements Validated{

    constructor(){
        super(null, null, null, null);
    }

    public validate(): boolean{
        return null
    }
}