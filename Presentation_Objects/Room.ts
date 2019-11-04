export class Room {

    protected uid: number;
    protected roomName: string;
    protected roomCapacity: number;
    
    
    protected constructor(roomName: string, roomCapacity: number) {
        this.roomName = roomName;
        this.roomCapacity = roomCapacity;
        
    }

    public getName(): string {
        return this.roomName;
    }

    public setName(room: string): void{ 
        this.roomName=room;     
    }


    public getCapacity(): number {
        return this.roomCapacity;
    }

    public setCapacity(roomCapacity: number): void {
        this.roomCapacity=roomCapacity; 
    }


    public getId(): number{
        return this.uid;
    }

    public getStrings(): Array<string>{
        return [this.roomName, String(this.roomCapacity)]; 
    }
}
