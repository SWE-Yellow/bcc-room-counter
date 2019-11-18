import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";
import { Validated } from "./Presentation_Objects/Validated/Validated";

import { Database } from "./Database"

export class DatabaseInterface {

    public con: any;

    //testing this.configs
    private readonly USERNAME: string =         "root";
    private readonly PASSWORD: string =         "";
    private readonly DATABASE_NAME: string =    "mydb";
    private readonly HOST: string =             "localhost";
    private readonly timeout: number =           5000;

    private db:Database;

    constructor(){
      this.db = new Database({
        host: this.HOST,
        user: this.USERNAME,
        password: this.PASSWORD,
        database: this.DATABASE_NAME
      });
      this.connect();
    }

    public connect(): void {
      this.db.connect();
    }

    public disconnect(): void{
      this.db.close();
    }

    public save(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean> {
      // this.connect();

      let save: Promise<boolean>

      if (selected instanceof Presentation) {
        
        save = this.db.insert({
          sql: 'INSERT INTO Presentation SET idSpeaker = ?, idRoom = ?, idTimeSlot = ?, topic = ?',
          timeout: this.timeout,
          values: [selected.getSpeaker().getId(), selected.getRoom().getId(), selected.getTime().getId(), selected.getTopic()]
        });

      } else if (selected instanceof Room) {

        save = this.db.insert({
          sql: 'INSERT INTO Room SET roomName = ?, roomCapacity = ?',
          timeout: this.timeout,
          values: [selected.getName(), selected.getCapacity()]
        });

      } else if(selected instanceof Speaker) {

        save = this.db.insert({
          sql: 'INSERT INTO Speaker SET idSpeaker = ?, speakerName = ?, speakerEmail = ?',
          timeout: this.timeout,
          values: [selected.getId(), selected.getName(), selected.getEmail()]
        });

      } else if(selected instanceof TimeSlot) {

        save = this.db.insert({
          sql: 'INSERT INTO TimeSlot SET idTimeSlot = ?, endTime = ?, startTime = ?',
          timeout: this.timeout,
          values: [selected.getId(), selected.getEnd(), selected.getStart()]
        });

      }

      // this.disconnect();
      return save;
    }

    public async fetch_all_presentations(): Promise<Array<Presentation>>{
      // this.connect();
      let res: Array<Presentation> = [];

      let temp = this.db.query({
        sql: `SELECT * FROM Presentation as p 
              left join Room as r on p.idRoom = r.idRoom
              left join Speaker as s on p.idSpeaker = s.idSpeaker
              left join TimeSlot as ts on p.idTimeSlot = ts.idTimeSlot`,
        timeout: this.timeout
      });

      await temp.then((rows) =>{
        rows.forEach(element => {
          res.push( new ValidatedPresentation(element['idPresentation'], element['topic'],
                      new ValidatedSpeaker(element['idSpeaker'], element['speakerName'], element['speakerEmail']),
                      new ValidatedTimeSlot(element['idTimeSlot'], element['startTime'], element['endTime']),
                      new ValidatedRoom(element['idRoom'], element['roomName'], element['roomCapacity']))
                    )
        });
      }).catch(error =>{
        // console.log(error)
      })
      
      // this.disconnect();
      return res
    }

    public async fetch_all_rooms(): Promise<Array<Room>> {
      // this.connect();
      let res: Array<Room> = [];
      let temp = this.db.query({
        sql: "SELECT * FROM Room",
        timeout: this.timeout
      });

      await temp.then(rows =>{
        rows.forEach(element => {
          res.push(new ValidatedRoom(element["idRoom"], element["roomName"], element["roomCapacity"]))
        });
      }).catch(error =>{
        // console.log("ERROR")
        // console.log(error)
      })
      
      return res
    }

    public async fetch_all_speakers(): Promise<Array<Speaker>>{
      // this.connect();
      let res: Array<Speaker> = [];
      let temp = this.db.query({
        sql: "SELECT * FROM Speaker",
        timeout: this.timeout
      });

      await temp.then(rows =>{
        rows.forEach(element => {
          res.push(new ValidatedSpeaker(element["idSpeaker"], element["speakerName"], element["speakerEmail"]))
        });
      }).catch(error =>{
        // console.log("ERROR")
        // console.log(error)
      })
      
      return res
    }

    public async fetch_all_time_slots(): Promise<Array<TimeSlot>> {
      // this.connect();
      let res: Array<TimeSlot> = [];
      let temp = this.db.query({
        sql: "SELECT * FROM timeslot",
        timeout: this.timeout
      });

      await temp.then(rows =>{
        rows.forEach(element => {
          res.push(new ValidatedTimeSlot(element["idTimeSlot"], element['startTime'], element["endTime"]))
        });
      }).catch(error =>{
        // console.log("ERROR")
        // console.log(error)
      })
      
      return res
    }

    
    public delete(selected: Presentation | Room | Speaker | TimeSlot): Promise<boolean> {
      // this.connect();

      let d: Promise<boolean>;

      if (selected instanceof Presentation) {

        // console.log(`DELETE FROM Presentation WHERE idPresentation = ${selected.getId()}`);

        d = this.db.delete({
          sql: 'DELETE FROM Presentation WHERE idPresentation = ?',
          timeout: this.timeout,
          values: [selected.getId()]
        })

      } else if (selected instanceof Room) {

        // console.log(`DELETE FROM Room WHERE idRoom = ${selected.getId()}`);

        d = this.db.delete({
          sql: 'DELETE FROM Room WHERE idRoom = ?',
          timeout: this.timeout,
          values: [selected.getId()]
        })

      } else if (selected instanceof Speaker) {
        
        d = this.db.delete({
          sql: 'DELETE FROM Speaker WHERE idSpeaker = ?',
          timeout: this.timeout,
          values: [selected.getId()]
        });

      } else if (selected instanceof TimeSlot) {

        d = this.db.delete({
          sql: 'DELETE FROM TimeSlot WHERE idTimeSlot = ?',
          timeout: this.timeout,
          values: [selected.getId()]
        });

      }

      // this.disconnect();

      return d;
    }

    public update_presentation(selected: Presentation): Promise<boolean>{
      let res: Promise<boolean>

      res = this.db.update({
        sql: 'UPDATE Presentation set topic = ?, idRoom = ?, idSpeaker = ?, idTimeSlot = ? WHERE idPresentation = ?',
        timeout: this.timeout,
        values: [selected.getTopic(), selected.getRoom().getId(), selected.getSpeaker().getId(), selected.getTime().getId(), selected.getId()]
      });

      return res
    }

    public update_room(selected: Room): Promise<boolean>{
      let res: Promise<boolean>
      
      res = this.db.update({
        sql: 'UPDATE Room set roomName = ?, roomCapacity = ? where idRoom = ?',
        timeout: this.timeout,
        values: [selected.getName(), selected.getCapacity(), selected.getId()]
      });

      return res
    }

    public update_speaker(selected: Speaker): Promise<boolean>{
      let res: Promise<boolean>
      
      res = this.db.update({
        sql: 'UPDATE Speaker set speakerName = ?, speakerEmail = ? where idSpeaker = ?',
        timeout: this.timeout,
        values: [selected.getName(), selected.getEmail(), selected.getId()]
      });

      return res
    }

    public update_time_slot(selected: TimeSlot): Promise<boolean>{
      let res: Promise<boolean>
      
      res = this.db.update({
        sql: 'UPDATE TimeSlot set startTime = ?, endTime = ? where idTimeSlot = ?',
        timeout: this.timeout,
        values: [selected.getStart(), selected.getEnd(), selected.getId()]
      });

      return res
    }
}
