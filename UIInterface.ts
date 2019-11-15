import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

// import { DatabaseInterface } from "./DatabaseInterface";
import DatabaseInterface from "./tests/mocks/DatabaseInterfaceMock";


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
        this.presentations = this.dbInterface.fetch_all_presentations()
        this.rooms = this.dbInterface.fetch_all_rooms()
        this.speakers = this.dbInterface.fetch_all_speakers()
        this.timeSlots = this.dbInterface.fetch_all_time_slots()
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
    public savePresentation(index: number, topic:string, roomId:number, speakerId:number, timeId:number): boolean{
        let currentPresentation;

        if(this.isValidIndex(index, this.presentations.length)){
            currentPresentation = this.presentations[index]
            if(!this.deletePresentation(index)){
                return false;
            }
        }else{
            currentPresentation = new ValidatedPresentation("", null, null, null)
        }

        currentPresentation.setTopic(topic);
        currentPresentation.setRoom(this.rooms[roomId]);
        currentPresentation.setSpeaker(this.speakers[speakerId]);
        currentPresentation.setTime(this.timeSlots[timeId]);

        let status = this.dbInterface.save(currentPresentation)

        if(status){
            this.presentations = this.dbInterface.fetch_all_presentations()
        }

        return status
    }

    /**
     * Save a speaker to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param first String for first name
     * @param last String for surname
     * @param email String for email uid
     */
    public saveSpeaker(index: number, first:string, last:string, email:string): boolean{
        var currentSpeaker;

        if(this.isValidIndex(index, this.speakers.length)){
            currentSpeaker = this.speakers[index]
            if(!this.deleteSpeaker(index)){
                return false;
            }
        }else{
            currentSpeaker = new ValidatedSpeaker(index, "", "", "");
        }

        currentSpeaker.setFirstName(first);
        currentSpeaker.setLastName(last);
        currentSpeaker.setEmail(email);

        let status = this.dbInterface.save(currentSpeaker)

        if(status){
            this.speakers = this.dbInterface.fetch_all_speakers()
        }

        return status
    }

    /**
     * Save a room to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param room name of the room
     * @param capacity capacity of the room
     */
    public saveRoom(index: number, name:string, capacity:number): boolean{
        let currentRoom;

        if(this.isValidIndex(index, this.rooms.length)){
            currentRoom = this.rooms[index];

            if(!this.deleteRoom(index)){
                return false;
            }
        }else{
            currentRoom = new ValidatedRoom(null, null, null);
        }

        currentRoom.setName(name);
        currentRoom.setCapacity(capacity);

        let status = this.dbInterface.save(currentRoom)

        if(status){
            this.rooms = this.dbInterface.fetch_all_rooms()
        }

        return status
    }

    /**
     * Save a time to the database
     * 
     * @param index index in the array sent by calling fetch
     * @param startTime start of the time slot
     * @param endTime end of the time slot
     */
    public saveTime(index: number, startTime:Date, endTime:Date): boolean{
        let current_time;

        if(this.isValidIndex(index, this.timeSlots.length)){
            current_time = this.timeSlots[index]
            if(!this.deleteTime(index)){
                return false;
            }
        }else{
            current_time = new ValidatedTimeSlot(null, null, null);
        }

        current_time.setStart(startTime);
        current_time.setEnd(endTime);


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
        
        return presentations
    }

    /**
     * Returns a map of speakers from the database
     */
    public fetchSpeakers(): Map<String, Array<String>>{

        this.speakers = this.dbInterface.fetch_all_speakers()

        let speakers: Map<String, Array<String>> = new Map();
        let firstNames: Array<String> = new Array<String>(this.speakers.length);
        let lastNames: Array<String> = new Array<String>(this.speakers.length);
        let emails: Array<String> = new Array<String>(this.speakers.length);


        for(let index = 0; index < this.speakers.length; index++) {
            firstNames[index] = this.speakers[index].getFirstName()
            lastNames[index] = this.speakers[index].getLastName()
            emails[index] = this.speakers[index].getEmail()
        }

        speakers.set("firstName", firstNames)
        speakers.set("lastName", lastNames)
        speakers.set("email", emails)

        return speakers
    }

    /**
     * Returns a map of rooms from the database
     */
    public fetchRooms(): Map<String, Array<String>>{
        
        this.rooms = this.dbInterface.fetch_all_rooms()

        let rooms: Map<String, Array<String>> = new Map();
        let roomNames: Array<String> = new Array<String>(this.rooms.length);
        let capacities: Array<String> = new Array<String>(this.rooms.length);

        for(let index = 0; index < this.rooms.length; index++) {
            roomNames[index] = this.rooms[index].getName()
            capacities[index] = this.rooms[index].getCapacity().toString()
        }

        rooms.set("roomName", roomNames)
        rooms.set("roomCapacity", capacities)

        return rooms
    }

    /**
     * Returns a map of timeslots from the database
     */
    public fetchTimes(): Map<String, Array<String>>{

        this.timeSlots = this.dbInterface.fetch_all_time_slots()

        let timeSlots: Map<String, Array<String>> = new Map();
        let startTimes: Array<String> = new Array<String>(this.timeSlots.length)
        let endTimes: Array<String> = new Array<String>(this.timeSlots.length)

        for(let index = 0; index < this.presentations.length; index++) {
            startTimes[index] = this.timeSlots[index].getStart().toLocaleTimeString()
            endTimes[index] = this.timeSlots[index].getEnd().toLocaleTimeString()
        }    
        
        timeSlots.set("startTime", startTimes)
        timeSlots.set("endTime", endTimes)

        return timeSlots
    }


    /**
     * Attempts to delete given presentation with unique ID "index" from database.
     * 
     * @param index Index from array for the presentation
     */
    public deletePresentation(index: number): boolean{

        // Flag to determine if the presentation was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.presentations.length) ) {
        
            // Get presentation object based on index (UID)
            let deletedPresentation: Presentation = this.presentations[index];

            // Attempt to delete presentation from database
            let dbDeleted = this.dbInterface.delete(deletedPresentation);

            // If successfully deleted
            if (dbDeleted) {
                // Update presentations from database
                // Set deleted flag
                this.presentations = this.dbInterface.fetch_all_presentations();
                deleted = true;
            }
        }

        return deleted;
    }

    /**
     * Attempts to delete given speaker with unique ID "index" from database.
     * 
     * @param index Index from array for the speaker
     */
    public deleteSpeaker(index: number): boolean{

        // Flag to determine if the speaker was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.speakers.length) ) {

            // Get presentation object based on index (UID)
            let deletedSpeaker: Speaker = this.speakers[index];
            
            // Attempt to delete given speaker in database
            let dbDeleted = this.dbInterface.delete(deletedSpeaker);

            // If successfully deleted
            if (dbDeleted) {
                // Update speakers from database
                // Set deleted flag
                this.speakers = this.dbInterface.fetch_all_speakers();
                deleted = true;
            }
        }

        return deleted;
    }

    /**
     * Attempts to delete given room with unique ID "index" from database.
     * 
     * @param index Index from array for the room
     */
    public deleteRoom(index: number): boolean{

        // Flag to determine if the room was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.rooms.length) ) {

            // Get presentation object based on index (UID)
            let deletedRoom: Room = this.rooms[index];

            // Attempt to delete given room in database
            let dbDeleted = this.dbInterface.delete(deletedRoom);

            // If successfully deleted
            if (dbDeleted) {
                // Update room from database
                // Set deleted flag
                this.rooms = this.dbInterface.fetch_all_rooms();
                deleted = true;
            }
        }

        return deleted;
    }

    /**
     * Attempts to delete given time slot with unique ID "index" from database.
     * 
     * @param index Index from array for the time slot
     */
    public deleteTime(index: number): boolean{

        // Flag to determine if the time was deleted
        let deleted: boolean = false;

        // Validate the index
        if ( this.isValidIndex(index, this.timeSlots.length) ) {

            // Get presentation object based on index (UID)
            let deletedTime: TimeSlot = this.timeSlots[index];

            // Delete the given timeslot in database
            let dbDeleted = this.dbInterface.delete(deletedTime);

            // If successfully deleted
            if (dbDeleted) {
                // Update timeslots from database
                // Set deleted flag
                this.timeSlots = this.dbInterface.fetch_all_time_slots();
                deleted = true;
            }
        }
        
        return deleted;
    }

    /**
     * Makes sure testIndex is a non-negative integer
     * 
     * @param testIndex Index to test validity of
     */
    private isValidIndex(testIndex: number, arrayLenth: number): boolean {
        
        // Verify if index is and integer
        let isInteger: boolean = Number.isInteger(testIndex);

        // If is an integer and within bounds of the array
        if( isInteger && testIndex >= 0 && testIndex < arrayLenth ){
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