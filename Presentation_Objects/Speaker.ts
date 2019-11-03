export class Speaker {

    protected uid: number;
    protected firstName: string;
    protected lastName: string;
    protected email: string;

    protected constructor(uid: number, firstName: string, lastName: string, email: string){
        this.uid=uid;
        this.firstName=firstName;
        this.lastName=lastName;
        this.email=email;

    }

    public getFirstName(): string {
        return firstName;
    }

    public setFirstName(first: string): void {
        this.firstName=first;
    }

    public getLastName(): string {
        return lastName;
    }

    public setLastName(last: string): void {
        this.lastName=last;
    }


    public getEmail(): string {
        return email;
    }
    
    public setEmail(email: string): void {
        this.email=email;
    }


    public getId(): number{
        return uid;
    }

    public getStrings(): Array<string>{
        return [firstName, lastName, email];
    }
}
