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

    /**
     * Returns a map of speakers from the database
     */
    public fetchSpeakers(): Map<String, Array<String>>{

        this.speakers = this.dbInterface.fetch_all_speakers()

        let speakers: Map<String, Array<String>>
        let firstNames: Array<String>
        let lastNames: Array<String>
        let ids: Array<String>

        for(let index = 0; index < this.presentations.length; index++) {
            firstNames[index] = this.speakers[index].getFirstName()
            lastNames[index] = this.speakers[index].getLastName()
            ids[index] = this.speakers[index].getId().toString()
        }

        speakers.set("firstName", firstNames)
        speakers.set("lastName", lastNames)
        speakers.set("id", ids)

        return speakers
    }

    /**
     * Returns a map of rooms from the database
     */
    public fetchRooms(): Map<String, Array<String>>{
        
        this.rooms = this.dbInterface.fetch_all_rooms()

        let rooms: Map<String, Array<String>>
        let roomNames: Array<String>
        let capacities: Array<String>
        let ids: Array<String>

        for(let index = 0; index < this.presentations.length; index++) {
            roomNames[index] = this.rooms[index].getName()
            capacities[index] = this.rooms[index].getCapacity().toString()
            ids[index] = this.rooms[index].getId().toString()
        }

        rooms.set("roomName", roomNames)
        rooms.set("roomCapacity", capacities)
        rooms.set("id", ids)

        return rooms
    }

    /**
     * Returns a map of timeslots from the database
     */
    public fetchTimes(): Map<String, Array<String>>{

        this.timeSlots = this.dbInterface.fetch_all_time_slots()

        let timeSlots: Map<String, Array<String>>
        let startTimes: Array<String>
        let endTimes: Array<String>
        let ids: Array<String>

        for(let index = 0; index < this.presentations.length; index++) {
            startTimes[index] = this.timeSlots[index].getStart().toTimeString()
            endTimes[index] = this.timeSlots[index].getEnd().toTimeString()
            ids[index] = this.timeSlots[index].getId().toString()
        }    
        
        timeSlots.set("startTime", startTimes)
        timeSlots.set("endTime", endTimes)
        timeSlots.set("id", ids)

        return timeSlots
    }


    public deletePresentation(topic: string, roomId: number, speakerId: number, timeId: number): boolean{

        let deleted: boolean = false;

        // Get room, speaker, and time from the given UID
        let room:       Room        = this.rooms[roomId];
        let speaker:    Speaker     = this.speakers[speakerId];
        let time:       TimeSlot    = this.timeSlots[timeId];
        
        // Create presentation object from parameters
        let deletedPresentation: Presentation = new ValidatedPresentation(topic, speaker, time, room);

        // Attempt to delete presentation from database
        let dbDeleted = this.dbInterface.delete(deletedPresentation);

        // If successfully deleted
        if (dbDeleted) {
            // Update presentations from database
            // Set deleted flag to true
            this.presentations = this.dbInterface.fetch_all_presentations();
            deleted = true;
        }

        return deleted;
    }

    public deleteSpeaker(first: string, last: string, email: string): boolean{
        
        let deleted: boolean = false;

        // Build speaker object from parameters
        let deletedSpeaker: Speaker = new ValidatedSpeaker(first, last, email);
        
        // Attempt to delete given speaker in database
        let dbDeleted = this.dbInterface.delete(deletedSpeaker);

        // If successfully deleted
        if (dbDeleted) {
            // Update speakers from database
            // Set deleted flag to true
            this.speakers = this.dbInterface.fetch_all_speakers();
            deleted = true;
        }

        return deleted;
    }

    /**
     * Delete given room from database. Fails if given room is not found in database
     * 
     * @param room Name of the room
     * @param capacity Maximum number of occupants supported by the room
     */
    public deleteRoom(room: string, capacity: string): boolean{

        let deleted: boolean = false;

        // Convert string capacity to integer
        let capacityInt: number = parseInt(capacity);

        // Build room object from parameters
        let deletedRoom: Room = new ValidatedRoom(room, capacityInt);

        // Attempt to delete given room in database
        let dbDeleted = this.dbInterface.delete(deletedRoom);

        // If successfully deleted
        if (dbDeleted) {
            // Update room from database
            // Set deleted flag to true
            this.rooms = this.dbInterface.fetch_all_rooms();
            deleted = true;
        }

        return deleted;
    }

    public deleteTime(startTime: string, endTime: string): boolean{

        let deleted: boolean = false;

        // If invalid format, then Date.parse will return NaN
        let startDateTime:  number = Date.parse(startTime);
        let endDatetime:    number = Date.parse(endTime);
        
        // Ensure startDatetime and endDateTime were successful (not NaN)
        // Cannot delete with improper start or end time
        if (startDateTime !== NaN && endDatetime !== NaN){

            // How will I know the UID?
            // Would it make more sense to get the UID as parameter rather than start/end time?
            let deletedTime: TimeSlot = new ValidatedTimeSlot(-1, new Date(startDateTime), new Date(endDatetime));

            // Delete the given timeslot in database
            let dbDeleted = this.dbInterface.delete(deletedTime);

            // If successfully deleted
            if (dbDeleted) {
                // Update timeslots from database
                // Set deleted flag to true
                this.timeSlots = this.dbInterface.fetch_all_time_slots();
                deleted = true;
            }
        }
        
        return deleted;
    }

}