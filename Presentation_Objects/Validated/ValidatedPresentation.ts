import { Presentation } from "../Presentation";
import { Room } from "../Room";
import { Validated, Validator } from "./Validated";
import { Speaker } from "../Speaker";
import { TimeSlot } from "../TimeSlot";

export class ValidatedPresentation extends Presentation implements Validated{

    constructor(topic: string, speaker: Speaker, time: TimeSlot, room: Room){
        super(topic, speaker, time, room);
    }

    public validate(): boolean{
        if (Validator.isStringValid(this.topic))
            return false
        //TODO: What else do we validate here?
        return true
    }
}