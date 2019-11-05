import { Presentation } from "../../Presentation_Objects/Presentation";
import { Room } from "../../Presentation_Objects/Room";
import { Speaker } from "../../Presentation_Objects/Speaker";
import { TimeSlot } from "../../Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "../../Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "../../Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "../../Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "../../Presentation_Objects/Validated/ValidatedTimeSlot";

export default class DatabaseInterface {

    private USERNAME: string =         "insert username";
    private PASSWORD: string =         "insert password";
    private DATABASE_NAME: string =    "insert db name";
    private LINK: String =             "insert link";

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
        return [new ValidatedPresentation("", new ValidatedSpeaker("", "", ""), new ValidatedTimeSlot(0, new Date(0), new Date(0)), new ValidatedRoom("", 0))];
    }

    public fetch_all_rooms(): Array<Room>{
        return [new ValidatedRoom("", 0)];
    }

    public fetch_all_speakers(): Array<Speaker>{
        return [new ValidatedSpeaker("", "", "")];
    }

    public fetch_all_time_slots(): Array<TimeSlot>{
        return [new ValidatedTimeSlot(0, new Date(0), new Date(0))];
    }


    public delete(selected: Presentation): boolean;
    public delete(selected: Room): boolean;
    public delete(selected: Speaker): boolean;
    public delete(selecetd: TimeSlot): boolean;

    public delete(seleceted: any): boolean{

        if (Math.random() > 0.5) {
            console.log("Expected: Pass");
            return true;
        }
        console.log("Expected: Fail");
        return false;
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