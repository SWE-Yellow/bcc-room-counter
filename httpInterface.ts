import { request } from 'http';

import { Presentation } from './Presentation_Objects/Presentation';
import { Speaker } from './Presentation_Objects/Speaker';
import { Room } from './Presentation_Objects/Room';
import { TimeSlot } from './Presentation_Objects/TimeSlot';

import { ValidatedPresentation } from './Presentation_Objects/Validated/ValidatedPresentation'
import { ValidatedSpeaker } from './Presentation_Objects/Validated/ValidatedSpeaker'
import { ValidatedRoom } from './Presentation_Objects/Validated/ValidatedRoom';
import { ValidatedTimeSlot } from './Presentation_Objects/Validated/ValidatedTimeSlot'

export class httpInterface{
    private host: string = "localhost";
    private port: string = "80";
    private method: string = "GET";

    constructor(){}

    public async save(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean>{
        if(selected instanceof Presentation){
            return this.modifyPresentation("save", selected);
        }else if(selected instanceof Room){
            return this.modifyRoom("save", selected);
        }else if(selected instanceof Speaker){
            return this.modifySpeaker("save", selected);
        }else{
            return this.modifyTimeSlot("save", selected);
        }
    }

    public async fetch_all_presentations():Promise<Array<Presentation>>{
        return new Promise(async resolve => {
            let presentations:Array<Presentation> = []

            this.fetch("/getPresentations").then(data => {
                presentations.push(new ValidatedPresentation(data['uid'], data["topic"],
                    new ValidatedSpeaker(data['speaker']['uid'], data['speaker']['speakerName'], data['speaker']['speakerCapacity']),
                    new ValidatedTimeSlot(data['uid'], data['time']['startTime'], data['time']['endTime']), 
                    new ValidatedRoom(data['room']['uid'], data['room']['roomName'], data['room']['roomCapacity']),
                    ))
            })

        });
    }

    public async fetch_all_speakers(): Promise<Array<Speaker>>{
        return new Promise(async resolve => {
            let speakers:Array<Speaker> = []
        
            this.fetch("/getSpeakers").then(data =>{            
                data.forEach(speaker => {
                    speakers.push(new ValidatedSpeaker(speaker["uid"], speaker["speakerName"], speaker["speakerEmail"]))
                });
            
                resolve(speakers)
            })
        })
    }

    public async fetch_all_rooms(): Promise<Array<Room>>{
        return new Promise(async resolve => {
            let rooms:Array<Room> = []
        
            this.fetch("/getRooms").then(data =>{            
                data.forEach(room => {
                    rooms.push(new ValidatedRoom(room["uid"], room["roomName"], room["roomCapacity"]))
                });
            
                resolve(rooms)
            })
        })
    }

    public async fetch_all_time_slots(): Promise<Array<TimeSlot>>{
        return new Promise(async resolve => {
            let times:Array<TimeSlot> = []
        
            this.fetch("/getTimeslots").then(data =>{            
                data.forEach(time => {
                    times.push(new ValidatedTimeSlot(time["uid"], time["startTime"], time["endTime"]))
                });
            
                resolve(times)
            })
        })
    }
    
    public async delete(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean>{
        if(selected instanceof Presentation){
            return this.modifyPresentation("delete", selected)
        }else if(selected instanceof Room){
            return this.modifyRoom("delete", selected)
        }else if(selected instanceof Speaker){
            return this.modifySpeaker("delete", selected)
        }else{
            return this.modifyTimeSlot("delete", selected)
        }
    }

    public async update_presentation(selected: Presentation): Promise<boolean>{
        return this.modifyPresentation("update", selected);
    }

    public async update_speaker(selected: Speaker): Promise<boolean>{
        return this.modifySpeaker("update", selected);
    }

    public async update_room(selected: Room): Promise<boolean>{
        return this.modifyRoom("update", selected);
    }

    public async update_time_slot(selected: TimeSlot): Promise<boolean>{
        return this.modifyTimeSlot("update", selected);
    }

    public fetch(path:string):Promise<Array<any>>{

        return new Promise(resolve => {
            let data:Array<any>;
        
            let req = request({
                host: this.host,
                path: path,
                port: '80',
                method: this.method,
            
            }, response =>{

                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                    });
                response.on('end', () => {
                    data = JSON.parse(Buffer.concat(chunks).toString());
                    //console.log(data)
                    resolve(data)
                });
            })
            req.end()

            
        })
    }

    private async modify(path:string):Promise<boolean>{
        return new Promise(resolve => {
            let data:string;
        
            let req = request({
                host: this.host,
                path: path,
                port: this.port,
                method: this.method,
            
            }, response =>{

                const chunks = [];
                response.on('data', (chunk) => {
                    chunks.push(chunk);
                    });
                response.on('end', () => {
                    data = JSON.parse(Buffer.concat(chunks).toString());
                    if(data == "true"){
                        resolve(true)
                    }else{
                        resolve(false)
                    }    
                });
            })
            req.end()        
        })
    }

    private modifyPresentation(operation:string, selected:Presentation): Promise<boolean>{
        return this.modify(`${operation}Presentation?
                            uid=${selected.getId()}
                            &presentationTopic=${selected.getTopic()}
                            &presentationSpeaker=${selected.getSpeaker().getId()}
                            &presentationRoom=${selected.getRoom().getId()}
                            &presentationTime=${selected.getTime().getId()}`)
    }


    private modifySpeaker(operation:string, selected:Speaker): Promise<boolean>{
        return this.modify(`${operation}Speaker?
                            uid=${selected.getId()}
                            &speakerName=${selected.getName()}
                            &speakerEmail=${selected.getEmail()}`)
    }


    private modifyRoom(operation:string, selected:Room): Promise<boolean>{
        return this.modify(`${operation}Room?
                            uid=${selected.getId()}
                            &roomName=${selected.getName()}
                            &roomCapacity=${selected.getCapacity().toString()}`)
    }


    private modifyTimeSlot(operation:string, selected:TimeSlot){
        return this.modify(`${operation}TimeSlot?
                            uid=${selected.getId()}
                            &startTime=${(selected.getStart().getTime())/1000}
                            &endTime=${(selected.getEnd().getTime())/1000}`)
    }

}