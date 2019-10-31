import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

import { DatabaseInterface } from "./DatabaseInterface";

class UIInterface {

    private presentations: Array<Presentation>;
    private rooms: Array<Room>;
    private speakers: Array<Speaker>;
    private timeSlots: Array<TimeSlot>;
    private dbInterface: DatabaseInterface;

    /**
     * Main Constructor
     * @param username username for logging in
     * @param password passwd for logging in
     */
    constructor(username: String, password: String){
        //Instantiate Database interface
        this.dbInterface = new DatabaseInterface()

        //Fetch rooms from database to populate arrays
        this.presentations = this.dbInterface.fetch_all_presentations()
        this.rooms = this.dbInterface.fetch_all_rooms()
        this.speakers = this.dbInterface.fetch_all_speakers()
        this.timeSlots = this.dbInterface.fetch_all_time_slots()
    }

    /**
     * Save a presentation to the database
     * 
     * @param topic string value for the presentation topic
     * @param roomId roomId number in database
     * @param speakerId speakerId number in database
     * @param timeId timeslotId number in database
     */
    public savePresntation(topic: string, roomId: number, speakerId: number, timeId: number): boolean{

        let currentPresentation = new ValidatedPresentation(topic, this.speakers[speakerId], this.timeSlots[timeId], this.rooms[roomId])

        let status = this.dbInterface.save(currentPresentation)

        if(status){
            this.presentations = this.dbInterface.fetch_all_presentations()
        }

        return status
    }

    /**
     * Save a speaker to the database
     * 
     * @param first String for first name
     * @param last String for surname
     * @param email String for email uid
     */
    public saveSpeaker(first: string, last: string, email: string): boolean{

        let currentSpeaker = new ValidatedSpeaker(0, first, last, email)

        let status = this.dbInterface.save(currentSpeaker)

        if(status){
            this.speakers = this.dbInterface.fetch_all_speakers()
        }

        return status
    }

    /**
     * Save a room to the database
     * 
     * @param room name of the room
     * @param capacity capacity of the room
     */
    public saveRoom(room: string, capacity: string): boolean{

        let currentRoom = new ValidatedRoom(room, +capacity)

        let status = this.dbInterface.save(currentRoom)

        if(status){
            this.rooms = this.dbInterface.fetch_all_rooms()
        }

        return status
    }

    /**
     * Save a time to the database
     * 
     * @param startTime start of the time slot
     * @param endTime end of the time slot
     */
    public saveTime(startTime: string, endTime: string): boolean{

        let current_time = new ValidatedTimeSlot(0, new Date(Date.parse(startTime)), new Date(Date.parse(endTime)))

        let status = this.dbInterface.save(current_time)

        if(status){
            this.timeSlots = this.dbInterface.fetch_all_time_slots()
        }

        return status
    }

    
    public fetchPresentations(): Map<String, Array<String>>{
        return null
    }

    public fetchSpeakers(): Map<String, Array<String>>{
        return null
    }

    public fetchRooms(): Map<String, Array<String>>{
        return null
    }

    public fetchTimes(): Map<String, Array<String>>{
        return null
    }


    public deltePresntation(topic: string, roomId: number, speakerId: number, timeId: number): boolean{
        return null
    }

    public deleteSpeaker(first: string, last: string, email: string): boolean{
        return null
    }

    public delteRoom(room: string, capacity: string): boolean{
        return null
    }

    public delteTime(startTime: string, endTime: string): boolean{
        return null
    }

}