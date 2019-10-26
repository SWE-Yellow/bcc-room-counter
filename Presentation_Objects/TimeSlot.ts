export class TimeSlot{

    protected uid: number;
    protected startTime: Date;
    protected endTime: Date;

    protected constructor(uid: number, startTime: Date, endTime:Date){

    }


    public getStart(): Date{
        return null
    }

    public setStart(start: Date): void{}


    public getEnd(): Date{
        return null
    }

    public setEnd(end: Date): void{}


    public getId(): number{
        return null
    }

    public getStrings(): Array<string>{
        return null
    }

}