import { Presentation } from "../Presentation";
import { Room } from "../Room";
import { Validated, Validator } from "./Validated";
import { Speaker } from "../Speaker";
import { TimeSlot } from "../TimeSlot";

export class ValidatedPresentation extends Presentation implements Validated{

    constructor(uid: number, topic: string, speaker: Speaker, time: TimeSlot, room: Room){
        super(uid, topic, speaker, time, room);
    }

    public validate(): boolean{
        return Validator.isStringValid(this.topic)
    }
}