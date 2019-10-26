import { Presentation } from "../Presentation";
import { Validated } from "./Validated";

export class ValidatedPresentation extends Presentation implements Validated{

    constructor(){
        super(null, null, null, null, null);
    }

    public validate(): boolean{
        return null
    }
}