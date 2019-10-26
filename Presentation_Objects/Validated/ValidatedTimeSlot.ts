import { TimeSlot } from "../TimeSlot";
import { Validated } from "./Validated";

export class ValidatedTimeSlot extends TimeSlot implements Validated{

    constructor(){
        super(null, null, null);
    }

    public validate(): boolean{
        return null
    }
}