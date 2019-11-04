import { Speaker } from "./Speaker";
import { Room } from "./Room";
import { TimeSlot } from "./TimeSlot";

 export class Presentation {

    protected topic: string;
    protected speaker: Speaker;
    protected time: TimeSlot;
    protected room: Room;
    protected presentationId: number;

    protected constructor(topic: string, speaker: Speaker, time: TimeSlot, room: Room) {
        this.topic = topic
        this.speaker = speaker
        this.time = time
        this.room = room
    }

    public getTopic(): string {
        return this.topic
    }

    public setTopic(topic: string): void {
        this.topic = topic
    }


    public getSpeaker(): Speaker {
        return this.speaker
    }

    public setSpeaker(speaker: Speaker): void {
        this.speaker = speaker
    }


    public getRoom(): Room {
        return this.room
    }

    public setRoom(room: Room): void {
        this.room = room
    }


    public getTime(): TimeSlot{
        return this.time
    }

    public setTime(time: TimeSlot): void {
        this.time = time
    }


    public getPresentationId(): number {
        return this.presentationId
    }

    public getStrings(): Array<string>{
        return [
            this.topic,
            this.speaker.getFirstName + " " + this.speaker.getLastName,
            this.room.getName(),
            this.time.getStart.toString + "-" + this.time.getEnd.toString
        ]
    }
}