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
        return this.startTime;
    }

    public setStart(start: Date): void{
        this.startTime=start;
    }


    public getEnd(): Date{
        return this.endTime;
    }

    public setEnd(end: Date): void{
        this.endTime=end;
    }


    public getId(): number{
        return this.uid;
    }

    public getStrings(): Array<string>{
        return [String(this.startTime), String(this.endTime)];
    }

}
