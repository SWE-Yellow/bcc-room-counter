export class Speaker {

    protected uid: number;
    protected name: string;
    protected email: string;


    protected constructor(uid: number, name: string, email: string){
        this.uid=uid;
        this.name=name;
        this.email=email;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name=name;
    }


    public getEmail(): string {
        return this.email;
    }
    
    public setEmail(email: string): void {
        this.email=email;
    }

    public getId(): number{
        return this.uid;
    }

    public setId(newId: number){
        if (this.uid < 0)
            this.uid = newId;
    }

    public getStrings(): Array<string>{
        return [this.name, this.email];
    }
}
