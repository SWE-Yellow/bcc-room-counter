import { Room } from "../Room";
import { Validated, Validator } from "./Validated";

export class ValidatedRoom extends Room implements Validated{

    constructor(roomName: string, roomCapacity: number){
        super(roomName, roomCapacity);
    }

    public validate(): boolean{
        if (!Validator.isStringValid(this.roomName))
            return false
        if (!Validator.isIntValid(this.roomCapacity))
            return false
        return true
    }
}