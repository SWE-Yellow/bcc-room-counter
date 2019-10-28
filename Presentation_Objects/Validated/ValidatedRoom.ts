import { Room } from "../Room";
import { Validated } from "./Validated";

export class ValidatedRoom extends Room implements Validated{

    constructor(roomName: string, roomCapacity: number){
        super(roomName, roomCapacity);
    }

    public validate(): boolean{
        return null
    }
}