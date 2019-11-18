import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

import { DatabaseInterface } from "./DatabaseInterface";
// import DatabaseInterface from "./tests/mocks/DatabaseInterfaceMock";


export default class UIInterface {
    private presentations: Array<Presentation>;
    private rooms: Array<Room>;
    private speakers: Array<Speaker>;
    private timeSlots: Array<TimeSlot>;
    private dbInterface: DatabaseInterface;

    /**
     * Main Constructor
     * 
     * @param dbInt optional for testing purposes
     */
    constructor(dbInt?:DatabaseInterface){
        if(dbInt){
            this.dbInterface = dbInt
        }else{
            //Instantiate Database interface
            this.dbInterface = new DatabaseInterface()
        }

        //Fetch rooms from database to populate arrays
        this.repopulate()
    }

    public disconnect(){
        this.dbInterface.disconnect();
    }

    private async repopulate(){
        this.presentations = await this.dbInterface.fetch_all_presentations()
        this.rooms = await this.dbInterface.fetch_all_rooms()
        this.speakers = await this.dbInterface.fetch_all_speakers()
        this.timeSlots = await this.dbInterface.fetch_all_time_slots()
    }

    /**
     * Save a presentation to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param topic string value for the presentation topic
     * @param roomId roomId number in database
     * @param speakerId speakerId number in database
     * @param timeId timeslotId number in database
     */
    public async savePresentation(index: number, topic:string, roomId:number, speakerId:number, timeId:number): Promise<boolean>{
        let currentPresentation;
        let status = false;  
        
        currentPresentation = new ValidatedPresentation(-1, 
            topic, 
            this.speakers[speakerId], 
            this.timeSlots[timeId], 
            this.rooms[roomId])

        if(!currentPresentation.validate()){
            return new Promise(resolve => {
                resolve(false)
            })
        }

        if(this.isValidIndex(index, this.presentations.length)){

            currentPresentation.setId(this.presentations[index].getId())

            return this.dbInterface.update_presentation(currentPresentation).catch(err => {
                                                return false;
                                            });
        }

        currentPresentation = new ValidatedPresentation(-1, topic, this.speakers[speakerId], this.timeSlots[timeId], this.rooms[roomId]);
        
        status = await this.dbInterface.save(currentPresentation).catch(err => {
            return false
        })
        

        if(status) {
            this.presentations = await this.dbInterface.fetch_all_presentations();
        }

        return new Promise((resolve, reject) =>{
            resolve(status);
        })
    }

    /**
     * Save a speaker to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param first String for first name
     * @param last String for surname
     * @param email String for email uid
     */
    public async saveSpeaker(index: number, name:string, email:string): Promise<boolean>{
        let currentSpeaker;
        let status;

        currentSpeaker = new ValidatedSpeaker(-1, name, email)

        if(!currentSpeaker.validate()){
            return new Promise(resolve =>{
                resolve(false)
            })
        }

        if(this.isValidIndex(index, this.speakers.length)){

            currentSpeaker.setId(this.speakers[index].getId())

            return this.dbInterface.update_speaker(
                currentSpeaker).catch(err => {
                    return false;
                })
        }

        status = await this.dbInterface.save(currentSpeaker).catch(err =>{
            return false;
        });

        if(status) {
            this.speakers = await this.dbInterface.fetch_all_speakers();
        }

        return new Promise(resolve =>{
            resolve(status);
        })
    }

    /**
     * Save a room to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param room name of the room
     * @param capacity capacity of the room
     */
    public async saveRoom(index: number, name:string, capacity:number): Promise<boolean>{
        let currentRoom;
        let status;

        currentRoom = new ValidatedRoom(-1, name, capacity)

            if(!currentRoom.validate()){
                return new Promise(resolve => {
                    resolve(false)
                })
            }

        if(this.isValidIndex(index, this.rooms.length)){  

            currentRoom.setId(this.rooms[index].getId())
                  
            return this.dbInterface.update_room(
                currentRoom).catch(err => {
                    return false;
                })
        }

        status = await this.dbInterface.save(currentRoom).catch(err =>{
            return false;
        });

        if(status) {
            this.rooms = await this.dbInterface.fetch_all_rooms();
        }

        return new Promise(resolve =>{
            resolve(status);
        })
    }

    /**
     * Save a time to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param startTime start of the time slot
     * @param endTime end of the time slot
     */
    public async saveTime(index: number, startTime:Date, endTime:Date): Promise<boolean>{
        let current_time;
        let status;

        current_time = new ValidatedTimeSlot(-1, startTime, endTime)

            if(!current_time.validate()){
                return new Promise(resolve => {
                    resolve(false)
                })
            }

        if(this.isValidIndex(index, this.timeSlots.length)){

            current_time.setId(this.timeSlots[index].getId())

            return this.dbInterface.update_time_slot(current_time
                ).catch(err => {
                    return false;
                })
        }

        status = await this.dbInterface.save(current_time).catch(err => {
            return false;
        });

        if(status) {
            this.timeSlots = await this.dbInterface.fetch_all_time_slots();
        }

        return new Promise(resolve =>{
            resolve(status);
        })
    }

    /**
     * Returns a map of presentations from the database
     */
    public async fetchPresentations(): Promise<Map<String, Array<String>>> {

        this.presentations = await this.dbInterface.fetch_all_presentations()
        
        let presentations: Map<String, Array<String>> = new Map();
        let topics: Array<String> = new Array<String>(this.presentations.length);
        let rooms: Array<String> = new Array<String>(this.presentations.length);
        let speakers: Array<String> = new Array<String>(this.presentations.length);
        let times: Array<String> = new Array<String>(this.presentations.length);

        for(let index = 0; index < this.presentations.length; index++) {
            topics[index] = this.presentations[index].getTopic()
            rooms[index] = String(this.findIndexOf(this.rooms, this.presentations[index].getRoom().getId()))
            speakers[index] = String(this.findIndexOf(this.speakers, this.presentations[index].getSpeaker().getId()))
            times[index] = String(this.findIndexOf(this.timeSlots, this.presentations[index].getTime().getId()))
        }
        presentations.set("topic", topics)
        presentations.set("roomId", rooms)
        presentations.set("speakersId", speakers)
        presentations.set("timeId", times)
        
        return new Promise(resolve => {
            resolve(presentations)
        })
    }

    // /**
    //  * Returns a map of speakers from the database
    //  */
    public async fetchSpeakers(): Promise<Map<String, Array<String>>> {

        this.speakers = await this.dbInterface.fetch_all_speakers();

        let speakers: Map<String, Array<String>> = new Map();
        let names: Array<String> = new Array<String>(this.speakers.length);
        let emails: Array<String> = new Array<String>(this.speakers.length);


        for(let index = 0; index < this.speakers.length; index++) {
            names[index] = this.speakers[index].getName()
            emails[index] = this.speakers[index].getEmail()
        }

        speakers.set("name", names)
        speakers.set("email", emails)

        return new Promise(resolve => {
            resolve(speakers)
        });
    }

    /**
     * Returns a map of rooms from the database
     */
    public async fetchRooms(): Promise<Map<String, Array<String>>> {
        
        this.rooms = await this.dbInterface.fetch_all_rooms();

        let rooms: Map<String, Array<String>> = new Map();
        let roomNames: Array<String> = new Array<String>(this.rooms.length);
        let capacities: Array<String> = new Array<String>(this.rooms.length);

        for(let index = 0; index < this.rooms.length; index++) {
            roomNames[index] = this.rooms[index].getName()
            capacities[index] = this.rooms[index].getCapacity().toString()
        }

        rooms.set("roomName", roomNames)
        rooms.set("roomCapacity", capacities)

        return new Promise(resolve => {
            resolve(rooms)
        });
    }

    /**
     * Returns a map of timeslots from the database
     */
    public async fetchTimes(): Promise<Map<String, Array<String>>> {

        this.timeSlots = await this.dbInterface.fetch_all_time_slots();

        let timeSlots: Map<String, Array<String>> = new Map();
        let startTimes: Array<String> = new Array<String>(this.timeSlots.length)
        let endTimes: Array<String> = new Array<String>(this.timeSlots.length)
        let combined: Array<String> = new Array<String>(this.timeSlots.length)

        var options = { hour: '2-digit', minute: '2-digit' };
        for(let index = 0; index < this.timeSlots.length; index++) {
            startTimes[index] = this.timeSlots[index].getStart().toLocaleTimeString("en-US", options)
            endTimes[index] = this.timeSlots[index].getEnd().toLocaleTimeString("en-US", options)
            combined[index] = (startTimes[index] + (" - ") + endTimes[index]) 
        }    
        
        timeSlots.set("startTime", startTimes)
        timeSlots.set("endTime", endTimes)
        timeSlots.set("combined", combined)

        return new Promise(resolve => {
            resolve(timeSlots)
        });;
    }


    /**
     * Attempts to delete given presentation with unique ID "index" from database.
     * 
     * @param index Index from array for the presentation
     */
    public async deletePresentation(index: number): Promise<boolean> {

        // Flag to determine if the presentation was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.presentations.length) ) {
        
            // Get presentation object based on index (UID)
            let deletedPresentation: Presentation = this.presentations[index];

            deleted = await this.dbInterface.delete(deletedPresentation).catch(err => {
                return false;
            });
            
            if(deleted) {
                this.presentations = await this.dbInterface.fetch_all_presentations();
            }
        }

        return new Promise(resolve => {
            resolve(deleted)
        });
    }

    /**
     * Attempts to delete given speaker with unique ID "index" from database.
     * 
     * @param index Index from array for the speaker
     */
    public async deleteSpeaker(index: number): Promise<boolean> {

        // Flag to determine if the speaker was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.speakers.length) ) {

            // Get presentation object based on index (UID)
            let deletedSpeaker: Speaker = this.speakers[index];

            deleted = await this.dbInterface.delete(deletedSpeaker).catch(err => {
                return false;
            });

            if(deleted) {
                this.speakers = await this.dbInterface.fetch_all_speakers();
            }
        }

        return new Promise(resolve => {
            resolve(deleted)
        });
    }

    /**
     * Attempts to delete given room with unique ID "index" from database.
     * 
     * @param index Index from array for the room
     */
    public async deleteRoom(index: number): Promise<boolean> {

        // Flag to determine if the room was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.rooms.length) ) {

            // Get presentation object based on index (UID)
            let deletedRoom: Room = this.rooms[index];

            deleted = await this.dbInterface.delete(deletedRoom).catch(err => {
                return false;
            });
            
            if(deleted){
                this.rooms = await this.dbInterface.fetch_all_rooms()
            }
        }

        return new Promise(resolve => {
            resolve(deleted)
        });
    }

    /**
     * Attempts to delete given time slot with unique ID "index" from database.
     * 
     * @param index Index from array for the time slot
     */
    public async deleteTime(index: number): Promise<boolean> {

        // Flag to determine if the time was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.timeSlots.length) ) {

            // Get presentation object based on index (UID)
            let deletedTime: TimeSlot = this.timeSlots[index];

            deleted = await this.dbInterface.delete(deletedTime).catch(err => {
                return false;
            })

            if(deleted){
                this.timeSlots = await this.dbInterface.fetch_all_time_slots()
            }
        }

        return new Promise(resolve =>{
            resolve(deleted)
        });
    }

    /**
     * Makes sure testIndex is a non-negative integer
     * 
     * @param testIndex Index to test validity of
     */
    private isValidIndex(testIndex: number, arrayLength: number): boolean {
        
        // Verify if index is and integer
        let isInteger: boolean = Number.isInteger(testIndex);

        // If is an integer and within bounds of the array

        if( isInteger && testIndex >= 0 && testIndex < arrayLength ){
            return true;
        }
        return false;
    }

    private findIndexOf(presentationObjects:Array<Room|Speaker|TimeSlot>, id:number): number{
        
        for(let i = 0; i < presentationObjects.length; i++){
            if(presentationObjects[i].getId() == id){
                return i;
            }
        }
        return -1
    }
}