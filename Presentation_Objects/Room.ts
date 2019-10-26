export class Room {

    protected uid: string;
    protected roomName: string;
    protected roomCapacity: number;

    protected constructor(roomName: string, roomCapacity: number) {
        
    }

    public getName(): string {
        return null
    }

    public setName(room: string): void{}


    public getCapacity(): number {
        return null
    }

    public setCapacity(roomCapacity: number): void {}


    public getId(): number{
        return null
    }

    public getStrings(): Array<string>{
        return null
    }
}