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
        return null;
    }


    public fetch_all_presentations(): Array<Presentation>{
        return [new ValidatedPresentation("", new ValidatedSpeaker(-1, "", "", ""), new ValidatedTimeSlot(0, new Date(0), new Date(0)), new ValidatedRoom(-1,"", 0))];
    }

    public fetch_all_rooms(): Array<Room>{
        return [new ValidatedRoom(-1, "", 0)];
    }

    public fetch_all_speakers(): Array<Speaker>{
        return [new ValidatedSpeaker(-1, "", "", "")];
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
            console.log("\tExpected: Pass");
            return true;
        }
        console.log("\tExpected: Fail");
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