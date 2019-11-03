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
    public savePresntation(index: number): boolean{

        let currentPresentation = this.presentations[index]

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
    public saveSpeaker(index: number): boolean{

        let currentSpeaker = this.speakers[index]

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
    public saveRoom(index: number): boolean{

        let currentRoom = this.rooms[index]

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
    public saveTime(index: number): boolean{

        let current_time = this.timeSlots[index]

        let status = this.dbInterface.save(current_time)

        if(status){
            this.timeSlots = this.dbInterface.fetch_all_time_slots()
        }

        return status
    }
    
    /**
     * Returns a map of presentations from the database
     */
    public fetchPresentations(): Map<String, Array<String>>{

        this.presentations = this.dbInterface.fetch_all_presentations()
        
        let presentations: Map<String, Array<String>>
        let topics: Array<String>
        let rooms: Array<String>
        let speakers: Array<String>
        let times: Array<String>

        for(let index = 0; index < this.presentations.length; index++) {
            topics[index] = this.presentations[index].getTopic()
            rooms[index] = this.presentations[index].getRoom().getId().toString()
            speakers[index] = this.presentations[index].getSpeaker().getId().toString()
            times[index] = this.presentations[index].getTime().getId().toString()
        }
        presentations.set("topic", topics)
        presentations.set("roomId", rooms)
        presentations.set("speakersId", speakers)
        presentations.set("timeId", times)
        
        return presentations
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


    /**
     * Attempts to delete given presentation with unique ID "index" from database.
     * 
     * @param index Index from array for the presentation
     */
    public deletePresentation(index: number): boolean{
        
        // Get presentation object based on index (UID)
        let deletedPresentation: Presentation = this.presentations[index];

        // Attempt to delete presentation from database
        let dbDeleted = this.dbInterface.delete(deletedPresentation);

        // If successfully deleted
        if (dbDeleted) {
            // Update presentations from database
            this.presentations = this.dbInterface.fetch_all_presentations();
        }

        return dbDeleted;
    }

    /**
     * Attempts to delete given speaker with unique ID "index" from database.
     * 
     * @param index Index from array for the speaker
     */
    public deleteSpeaker(index: number): boolean{

        // Get presentation object based on index (UID)
        let deletedSpeaker: Speaker = this.speakers[index];
        
        // Attempt to delete given speaker in database
        let dbDeleted = this.dbInterface.delete(deletedSpeaker);

        // If successfully deleted
        if (dbDeleted) {
            // Update speakers from database
            this.speakers = this.dbInterface.fetch_all_speakers();
        }

        return dbDeleted;
    }

    /**
     * Attempts to delete given room with unique ID "index" from database.
     * 
     * @param index Index from array for the room
     */
    public deleteRoom(index: number): boolean{

        // Get presentation object based on index (UID)
        let deletedRoom: Room = this.rooms[index];

        // Attempt to delete given room in database
        let dbDeleted = this.dbInterface.delete(deletedRoom);

        // If successfully deleted
        if (dbDeleted) {
            // Update room from database
            this.rooms = this.dbInterface.fetch_all_rooms();
        }

        return dbDeleted;
    }

    /**
     * Attempts to delete given time slot with unique ID "index" from database.
     * 
     * @param index Index from array for the time slot
     */
    public deleteTime(index: number): boolean{

        // Get presentation object based on index (UID)
        let deletedTime: TimeSlot = this.timeSlots[index];

        // Delete the given timeslot in database
        let dbDeleted = this.dbInterface.delete(deletedTime);

        // If successfully deleted
        if (dbDeleted) {
            // Update timeslots from database
            this.timeSlots = this.dbInterface.fetch_all_time_slots();
        }
        
        return dbDeleted;
    }

}