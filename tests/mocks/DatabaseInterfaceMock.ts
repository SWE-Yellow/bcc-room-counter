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

    public numSave:number = 0;

    private speakers = [new ValidatedSpeaker(0, "Ron Krawitz", "big_ron@hotmail.com"), new ValidatedSpeaker(1, "Abe Lincoln", "the_emancipator@aol.com")]
    private rooms =  [new ValidatedRoom(0, "Test Room 1", 10), new ValidatedRoom(1, "Test Room 2", 500), new ValidatedRoom(2, "Test Room 3", 50)]
    private times = [new ValidatedTimeSlot(0, new Date(0), new Date(0))]
    private presentations = [new ValidatedPresentation("Test Topic", this.speakers[1], this.times[0], this.rooms[2])]

    constructor(){}

    private connect(): void {}
    private disconnect(): void{}



    public save(selected: Presentation): boolean;
    public save(selected: Room): boolean;
    public save(selected: Speaker): boolean;
    public save(selected: TimeSlot): boolean;

    public save(selected: any): boolean{
        this.numSave ++

        switch(selected.constructor){
            case ValidatedPresentation: {
                if(this.numSave == 1){
                    if(selected.getTopic() == "TestTopic1"){
                        return true;
                    }
                }

                if(this.numSave == 2){
                    if(selected.getTopic() == ""){
                        return true;
                    }
                }

                return false;

                break;
            }
            case ValidatedRoom:{
                if(this.numSave == 1){
                    if(selected.getName() == "TestRoom1"){
                        return true;
                    }
                }

                if(this.numSave == 2){
                    if(selected.getName() == ""){
                        return true;
                    }
                }

                break;
            }

            case ValidatedSpeaker:{
                if(this.numSave == 1){
                    if(selected.getFirstName() == "Name"){
                        return true;
                    }
                }

                if(this.numSave == 2){
                    if(selected.getFirstName() == ""){
                        return true;
                    }
                }

                break;
            }
            case ValidatedTimeSlot:{
                if(this.numSave == 1){
                    if(selected.getStart().getTime() == new Date(0).getTime()){
                        return true;
                    }
                }

                if(this.numSave == 2){
                    if(selected.getStart().getTime() == new Date(5).getTime()){
                        return true;
                    }
                }

                break;
            }
        }
        return  false;
    }


    public fetch_all_presentations(): Array<Presentation>{
        return this.presentations;
    }

    public fetch_all_rooms(): Array<Room>{
        return this.rooms;
    }

    public fetch_all_speakers(): Array<Speaker>{
        return this.speakers;
    }

    public fetch_all_time_slots(): Array<TimeSlot>{
        return this.times;
    }


    public delete(selected: Presentation): boolean;
    public delete(selected: Room): boolean;
    public delete(selected: Speaker): boolean;
    public delete(selecetd: TimeSlot): boolean;

    public delete(seleceted: any): boolean{

        if (Math.random() > 0.5) {
            console.log("\tExpected: Pass");
            return true;
        }
        console.log("\tExpected: Fail");
        return false;
    }
}