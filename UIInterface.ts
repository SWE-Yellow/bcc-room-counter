import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";
import { DatabaseInterface } from "./DatabaseInterface";

class UIInterface {

    private presentations: Array<Presentation>;
    private rooms: Array<Room>;
    private speakers: Array<Speaker>;
    private timeSlots: Array<TimeSlot>;
    private dbInterface: DatabaseInterface;


    public savePresntation(topic: string, roomId: number, speakerId: number, timeId: number): boolean{
        return null
    }

    public saveSpeaker(first: string, last: string, email: string): boolean{
        return null
    }

    public saveRoom(room: string, capacity: string): boolean{
        return null
    }

    public saveTime(startTime: string, endTime: string): boolean{
        return null
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