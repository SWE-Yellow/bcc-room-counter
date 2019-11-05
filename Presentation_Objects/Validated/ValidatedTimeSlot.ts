import { TimeSlot } from "../TimeSlot";
import { Validated, Validator } from "./Validated";

export class ValidatedTimeSlot extends TimeSlot implements Validated{

    constructor(uid: number, startTime: Date, endTime:Date){
        super(uid, startTime, endTime);
    }

    public validate(): boolean{
        //TODO: how do we want to validate year?
        if (this.startTime.getFullYear() < 1970)
            return false
        if (this.endTime.getFullYear() < 1970)
            return false
        return true
    }
}