import { Room } from "../Room";
import { Validated, Validator } from "./Validated";

export class ValidatedRoom extends Room implements Validated{

    constructor(roomName: string, roomCapacity: number){
        super(roomName, roomCapacity);
    }

    public validate(): boolean{
        if (!Validator.isStringValid(this.roomName))
            return false
        return (!isNaN(this.roomCapacity) && this.roomCapacity >= 0 && this.roomCapacity < 1000)
    }
}