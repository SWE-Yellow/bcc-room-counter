import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

let con; //too lazy to think about other way than using global variable.

export class DatabaseInterface {

    //testing configs
    private readonly USERNAME: string =         "root";
    private readonly PASSWORD: string =         "password";
    private readonly DATABASE_NAME: string =    "test";
    private readonly HOST: String =             "localhost";

    constructor(){}

    private connect(): void {
      let mysql = require('mysql');

      //should probably create a config var or something, it's ugly like this.
      con = mysql.createConnection({
        host: this.HOST,
        user: this.USERNAME,
        password: this.PASSWORD,
        database: this.DATABASE_NAME
      });
      con.connect(function(err) {
        if(err) throw err;
        console.log("Connected");
      });
    }

    private disconnect(): void{}

    public save(selected: Presentation): boolean;
    public save(selected: Room): boolean;
    public save(selected: Speaker): boolean;

    //stubs using test db.
    //table names and columns should be modified according to the real db.
    public save(selected: TimeSlot): boolean {
      console.log("Timeslot save");
      let sql = "INSERT INTO Timeslot (idTimeslot, startTime, endTime) VALUES ('"+selected.uid+","+selected.startTime+","+selected.endTime+"')";
      con.query(sql, function(err, result) {
        if(err) throw err;
        console.log("Timeslot saved");
        return 1;
      });
    };

    public save(selected: any): boolean{
        return null;
    }

    //result may be Object, not Array?
    public fetch_all_presentations(): Array<Presentation>{
      console.log("Fetch all presentations");
      con.query("SELECT * FROM Presentations", function(err, result, fields) {
        if(err) throw err;
        return result;
      });
        return null;
    }

    public fetch_all_rooms(): Array<Room>{
      console.log("Fetch all rooms");
      con.query("SELECT * FROM Room", function(err, result, fields) {
        if(err) throw err;
        return result;
      });
        return null
    }

    public fetch_all_speakers(): Array<Speaker>{
      console.log("Fetch all speakers");
      con.query("SELECT * FROM Speakers", function(err, result, fields) {
        if(err) throw err;
        return result;
      });
        return null
    }

    public fetch_all_time_slot(): Array<TimeSlot>{
      console.log("Fetch all timeslot");
      con.query("SELECT * FROM Timeslot", function(err, result, fields) {
        if(err) throw err;
        return result;
      });
        return null
    }


    public delete(selected: Presentation): boolean;
    public delete(selected: Room): boolean;
    public delete(selected: Speaker): boolean;
    public delete(selecetd: TimeSlot): boolean;

    public delete(selected: any): boolean{
        return null
    }


    private update(selected: Presentation): boolean;
    private update(selected: Room): boolean;
    private update(selected: Speaker): boolean;
    private update(selected: TimeSlot): boolean;

    private update(selected: any): boolean{
        return null
    }


    private checkExists(selected: Presentation): boolean;
    private checkExists(selected: Room): boolean;
    private checkExists(selected: Speaker): boolean;
    private checkExists(selected: TimeSlot): boolean;

    private checkExists(selected: any): boolean{
        return null
    }

}
