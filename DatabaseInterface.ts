import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";

export class DatabaseInterface {

    public con: any;

    //testing this.configs
    private readonly USERNAME: string =         "root";
    private readonly PASSWORD: string =         "password";
    private readonly DATABASE_NAME: string =    "test";
    private readonly HOST: String =             "localhost";

    constructor(){}

    private connect(): void {
      let mysql = require('mysql');

      //should probably create a config or something, it's ugly like this.
      this.con = mysql.createConnection({
        host: this.HOST,
        user: this.USERNAME,
        password: this.PASSWORD,
        database: this.DATABASE_NAME
      });
      this.con.this.connect(function(err) {
        if(err) throw err;
        this.console.log("connected");
      });

      /* Pool
      this.con = mysql.createPool({
        host:       this.HOST,
        user:       this.USERNAME,
        password:   this.PASSWORD,
        database:   this.DATABASE_NAME
      });

      this.con.getConnection((err, connection) => {
        if(err) {
          if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
          }
          if(err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
          }
          if(err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
          }
        }
        if(connection) connection.release()
      });
      */

    }

    private disconnect(): void{
      this.con.end(function(err) {
        if(err) throw err;
      });
      //this.con.destroy();
    }

    public save(selected: Presentation): boolean {

    };

    public save(selected: Room): boolean {
      let save: boolean = false;

      /*
      this.con.query({
        sql: "INSERT INTO Room SET idRoom = ?, name = ?, capacity = ?",
        timeout: 40000,
        values: [selected.getId(), selected.getName(), selected.getCapacity()]
      }, function(error, result, fields) {
        save = true;
      });
      */

      let sql = "INSERT INTO Room (idRoom, name, capacity) VALUES ('"+selected.getId()+"', '"+selected.getName()+"', '"+selected.getCapacity()+"')";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        save = true;
      });
      return save;
    };

    public save(selected: Speaker): boolean {
      let save: boolean = false;
      let sql = "INSERT INTO Speakers (speakerId, first, last, email) VALUES ('"+selected.getId()+"', '"+selected.getFirstName()+"', '"+selected.getLastName()+"', '"+selected.getEmail()+"')";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        save = true;
      });
      return save;
    };

    //stubs using test db.
    //table names and columns should be modified according to the real db.
    public save(selected: TimeSlot): boolean {
      let save: boolean = false;
      let sql = "INSERT INTO Timeslot (idTimeslot, startTime, endTime) VALUES ('"+selected.getId()+","+selected.getStart()+","+selected.getEnd()+"')";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        save = true;
      });
      return save;
    };

    public save(selected: any): boolean{
        return null;
    }

    //result may be Object, not Array?
    public fetch_all_presentations(): Array<Presentation>{
      let res: Array<Presentation> = [];
      this.con.query("SELECT * FROM Presentations", function(err, result, fields) {
        if(err) throw err;
        res = result;
      });
      return res;
    }

    public fetch_all_rooms(): Array<Room>{
      let res: Array<Room> = [];
      this.con.query("SELECT * FROM Room", function(err, result, fields) {
        if(err) throw err;
        res = result;
      });
        return res;
    }

    public fetch_all_speakers(): Array<Speaker>{
      let res: Array<Speaker> = [];
      this.con.query("SELECT * FROM Speakers", function(err, result, fields) {
        if(err) throw err;
        res = result;
      });
        return res;
    }

    public fetch_all_time_slot(): Array<TimeSlot>{
      let res: Array<TimeSlot> = [];
      this.con.query("SELECT * FROM Timeslot", function(err, result, fields) {
        if(err) throw err;
        res = result;
      });
        return res;
    }


    public delete(selected: Presentation): boolean{
      let d: boolean = false;
      //Delete Presentation
      let sql = "DELETE FROM Presentations WHERE topic = '"+selected.getTopic()+"'";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        d = true;
      });
      return d;
    };

    public delete(selected: Room): boolean{
      let d: boolean = false;
      //Delete Room
      let sql = "DELETE FROM Room WHERE name = '"+selected.getName()+"' AND capacity = '"+selected.getCapacity()+"'";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        d = true;
      });
      return d;
    };

    public delete(selected: Speaker): boolean{
      let d: boolean = false;
      //Delete Speaker
      let sql = "DELETE FROM Speakers WHERE first = '"+selected.getFirstName()+"' AND last = '"+selected.getLastName()+"' AND email = '"+selected.getEmail()+"'";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        d = true;
      });
      return d;
    };

    public delete(selected: TimeSlot): boolean{
      let d: boolean = false;
      //Delete TimeSlot
      let sql = "DELETE FROM Timeslot WHERE startTime = '"+selected.getStart()+"' AND endTime = '"+selected.getEnd()+"'";
      this.con.query(sql, function(err, result) {
        if(err) throw err;
        d = true;
      });
      return d;
    };

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
