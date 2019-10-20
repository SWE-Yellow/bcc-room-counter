import { Presentation } from "./Presentation";

class DatabaseInterface {

    private readonly USERNAME: string =         "insert username";
    private readonly PASSWORD: string =         "insert password";
    private readonly DATABASE_NAME: string =    "insert db name";
    private readonly LINK: String =             "insert link";

    constructor(){

    }

    public connect(): void {
        
    }

    public save(): boolean {

    }

    public fetchAll(): Presentation[] {

    }

    public fetch(presentationId: number): Presentation {

    }

    private validate(currentPresentation: Presentation): boolean {

    }

    private checkExists(currentPresentation: Presentation): boolean {

    }

    private update(currentPresentation: Presentation): boolean {

    }
}