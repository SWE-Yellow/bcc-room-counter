import { request } from 'http';
import { Presentation } from './Presentation_Objects/Presentation';
import { Speaker } from './Presentation_Objects/Speaker';
import { Room } from './Presentation_Objects/Room';
import { TimeSlot } from './Presentation_Objects/TimeSlot';

export default class httpInterface{
    private host: string = "localhost";
    private method: string = "POST"

    private async fetch(path:string):Promise<any>{
        
        let req = await request({
            host: this.host,
            path: path,
            method: this.method,
        })

        return req
    }

    //parameters need to hold values of objects 
    private async modify(path:string, parameters:Array<any>):Promise<boolean>{

        //TODO: Add parameter logic

        let req = await request({
            host: this.host,
            //TODO: combine parameters with provided path
            path: path,
            method: this.method
        })

        return null
    }

    public async save(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean>{
        //TODO: Implement
        return null;
    }

    public async fetch_all_presentations():Promise<Array<Presentation>>{
        //TODO: Implement
        return null;
    }

    public async fetch_all_speakers(): Promise<Array<Speaker>>{
        //TODO: Implement
        return null;
    }

    public async fetch_all_rooms(): Promise<Array<Room>>{
        //TODO: Implement
        return null;
    }

    public async fetch_all_time_slots(): Promise<Array<TimeSlot>>{
        //TODO: Implement
        return null;
    }
    
    public async delete(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean>{
        //TODO: Implement
        return null;
    }

    public async update_presentation(selected: Presentation): Promise<boolean>{
        //TODO: Implement
        return null;
    }

    public async update_speaker(selected: Speaker): Promise<boolean>{
        //TODO: Implement
        return null;
    }

    public async update_room(selected: Room): Promise<boolean>{
        //TODO: Implement
        return null;
    }

    public async update_time_slot(selected: TimeSlot): Promise<boolean>{
        //TODO: Implement
        return null;
    }


}