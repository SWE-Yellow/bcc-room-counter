export class TimeSlot{

    protected uid: number;
    protected startTime: Date;
    protected endTime: Date;

    protected constructor(uid: number, startTime: Date, endTime:Date){
        this.uid=uid;
        this.startTime=startTime;
        this.endTime=endTime;
    }

    public getStart(): Date{
        return startTime;
    }

    public setStart(start: Date): void{
        this.startTime=start;
    }


    public getEnd(): Date{
        return endTime;
    }

    public setEnd(end: Date): void{
        this.endTime=end;
    }


    public getId(): number{
        return uid;
    }

    public getStrings(): Array<string>{
        return [String(startTime), String(endTime)];
    }

}
