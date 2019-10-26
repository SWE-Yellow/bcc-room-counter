import { Room } from "../Room";
import { Validated } from "./Validated";

export class ValidatedRoom extends Room implements Validated{

    constructor(){
        super(null, null);
    }

    public validate(): boolean{
        return null
    }
}