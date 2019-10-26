import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

export class DatabaseInterface {

    private readonly USERNAME: string =         "insert username";
    private readonly PASSWORD: string =         "insert password";
    private readonly DATABASE_NAME: string =    "insert db name";
    private readonly LINK: String =             "insert link";

    constructor(){}

    private connect(): void {}
    private disconnect(): void{}


    public save(selected: Presentation): boolean;
    public save(selected: Room): boolean;
    public save(selected: Speaker): boolean;
    public save(selected: TimeSlot): boolean;

    public save(selected: any): boolean{
        return null;
    }


    public fetch_all_presentations(): Array<Presentation>{
        return null
    }

    public fetch_all_rooms(): Array<Room>{
        return null
    }

    public fetch_all_speakers(): Array<Speaker>{
        return null
    }

    public fetch_all_time_slot(): Array<TimeSlot>{
        return null
    }


    public delete(selected: Presentation): boolean;
    public delete(selected: Room): boolean;
    public delete(selected: Speaker): boolean;
    public delete(selecetd: TimeSlot): boolean;

    public delete(seleceted: any): boolean{
        return null
    }

    
    private update(selecetd: Presentation): boolean;
    private update(selected: Room): boolean;
    private update(selected: Speaker): boolean;
    private update(selected: TimeSlot): boolean;

    private update(selected: any): boolean{
        return null
    }


    private checkExists(selected: Presentation): boolean;
    private checkExists(selected: Room): boolean;
    private checkExists(selected: Speaker): boolean;
    private checkExists(selected: TimeSlot): boolean;

    private checkExists(selected: any): boolean{
        return null
    }


}