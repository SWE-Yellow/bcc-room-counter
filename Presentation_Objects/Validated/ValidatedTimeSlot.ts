import { TimeSlot } from "../TimeSlot";
import { Validated } from "./Validated";

export class ValidatedTimeSlot extends TimeSlot implements Validated{

    constructor(uid: number, startTime: Date, endTime:Date){
        super(uid, startTime, endTime);
    }

    public validate(): boolean{
        return null
    }
}