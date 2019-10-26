import { Speaker } from "./Speaker";
import { Room } from "./Room";
import { TimeSlot } from "./TimeSlot";

 export class Presentation {

    protected topic: string;
    protected speaker: Speaker;
    protected time: TimeSlot;
    protected room: Room;
    protected presentationId: number;

    protected constructor(topic: string, speaker: Speaker, startTime: Date, endTime: Date, room: Room) {

    }

    public getTopic(): string {
        return null
    }

    public setTopic(topic: String): void {}


    public getSpeaker(): Speaker {
        return null
    }

    public setSpeaker(speaker: Speaker): void{}


    public getRoom(): Room {
        return null
    }

    public setRoom(room: Room): void{}


    public getTime(): TimeSlot{
        return null
    }

    public setTime(time: TimeSlot): void{}


    public getPresentationId(): number {
        return null
    }

    public getStrings(): Array<string>{
        return null
    }
}