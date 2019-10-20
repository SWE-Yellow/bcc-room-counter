import { Speaker } from "./Speaker";
import { Room } from "./Room";

export class Presentation {

    private topic: string;
    private speaker: Speaker;
    private startTime: Date;
    private endTime: Date;
    private room: Room;
    private presentationId: number;

    constructor(topic: string, speaker: Speaker, startTime: Date, endTime: Date, room: Room) {

    }

    public getTopic(): string {

    }

    public getSpeaker(): Speaker {

    }

    public getStartTime(): Date {

    }

    public getEndTime(): Date {

    }

    public getRoom(): Room {

    }

    public getPresentationId(): number {

    }

    public setTopic() {

    }

    public setSpeaker() {

    }

    public setStartTime() {

    }

    public setEndTime() {

    }

    public setRoom() {

    }

    /* Do we want to be able to set presentationId? Seems like it should be set when created and never changed
    public setPresentationId() {

    }
    */
}