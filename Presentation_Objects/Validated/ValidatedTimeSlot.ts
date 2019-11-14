import { TimeSlot } from "../TimeSlot";
import { Validated, Validator } from "./Validated";

export class ValidatedTimeSlot extends TimeSlot implements Validated{

    constructor(uid: number, startTime: Date, endTime:Date){
        super(uid, startTime, endTime);
    }

    public validate(): boolean{
        return this.startTime < this.endTime
    }
}