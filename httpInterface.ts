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

        //TODO: add logic to recontruct objects from json

        return req
    }

    private async modify(path:string):Promise<boolean>{

        let status:boolean

        let req = await request({
            host: this.host,
            path: path,
            method: this.method
        }, response => {
            response.on("status", (chunk) =>{
                status = chunk
            })
        })

        return new Promise(resolve =>{
            resolve(status)
        })
    }

    public async save(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean>{
        //TODO: Implement
        let saved:Promise<boolean>;

        if(selected instanceof Presentation){
            
            saved = null;

        }else if(selected instanceof Speaker){
            
            let temp = await this.modify("createRoom?uid=")

            saved = null

        }else if(selected instanceof Room){

            saved = null;

        }else if(selected instanceof TimeSlot){

            saved = null
        }


        return saved;
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

        let deleted:Promise<boolean>;

        if(selected instanceof Presentation){
            
            deleted = null;
            
        }else if(selected instanceof Speaker){

            deleted = null

        }else if(selected instanceof Room){

            deleted = null;

        }else if(selected instanceof TimeSlot){

            deleted = null
        }

        return deleted;
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