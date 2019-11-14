import { Presentation } from "./Presentation_Objects/Presentation";
import { Room } from "./Presentation_Objects/Room";
import { Speaker } from "./Presentation_Objects/Speaker";
import { TimeSlot } from "./Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "./Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "./Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "./Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";
import { Validated } from "./Presentation_Objects/Validated/Validated";

import { Database } from "./Database";

var mysql:any = require("mysql");
var desync:any = require("deasync");

export class DatabaseInterface {

    wait:boolean = false;

    public con: any;
    private db:Database;
  
    // private pool: any;

    //testing this.configs
    private readonly USERNAME: string =         "root";
    private readonly PASSWORD: string =         "";
    private readonly DATABASE_NAME: string =    "mydb";
    private readonly HOST: string =             "localhost";

    constructor(){}

    private connect(): void {
      //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; <-- Use this to solve Client Auth ERROR.

      // this.db = new Database({
      //     host: this.HOST,
      //     user: this.USERNAME,
      //     password: this.PASSWORD,
      //     database: this.DATABASE_NAME
      //   })


      this.con = mysql.createConnection({
        host: this.HOST,
        user: this.USERNAME,
        password: this.PASSWORD,
        database: this.DATABASE_NAME
      });

      // this.con.connect(function(err) {
      //   if(err) throw err;
      //   //this.console.log("connected");
      // });

      /* Pool
      this.pool = mysql.createPool({
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
      // this.db.close()

      this.con.end(function(err) {
        if(err) throw err;
      });
      this.con.destroy();
    }

    public save(selected: ValidatedPresentation | ValidatedRoom | ValidatedSpeaker | ValidatedTimeSlot): boolean {
      this.connect();

      let save: boolean = false;

      if (selected instanceof Presentation) {
        // await this.con.query({
        //   sql: 'INSERT INTO Presentation SET idSpeech = ?, presentationSpeaker = ?, presentationRoom = ?, presentationTimeSlot = ?, topic = ?',
        //   timeout: 40000,
        //   values: [selected.getPresentationId(), selected.getSpeaker(), selected.getRoom(), selected.getTime(), selected.getTopic()]

        // }, function(err, result, fields) {
        //   if(err) {
        //     throw err;
        //   }else{
        //     save = true;
        //     return save
        //   }
        // })



      } else if (selected instanceof Room) {
          // this.wait = true;
          // this.db.insert({
          //     sql: 'INSERT INTO Room SET idRoom = ?, roomName = ?, roomCapacity = ?',
          //     timeout: 40000,
          //     values: [selected.getId(), selected.getName(), selected.getCapacity()]
          //   }).then(rows =>{
          //     console.log("IN PROMISE")
          //     save = true;
          //     this.wait = false;
          //   })


        var query = desync(this.con.query);
        query({
          sql: 'INSERT INTO Room SET idRoom = ?, roomName = ?, roomCapacity = ?',
          timeout: 40000,
          values: [selected.getId(), selected.getName(), selected.getCapacity()]
        }, function(err, result, fields) {
          if(err) {
            throw err;
            console.log("ERROR");
          }else{
            console.log("NO ERROR")
            save = true;
            return save;
          }
        });

      } else if(selected instanceof Speaker) {
        // await this.con.query({
        //   sql: 'INSERT INTO Speaker SET idSpeaker = ?, speakerFIrstName = ?, speakerEmail = ?, speakerLastName = ?',
        //   timeout: 40000,
        //   values: [selected.getId(), selected.getFirstName(), selected.getEmail(), selected.getLastName()]
        // }, function(err, result, fields) {
        //   if(err) {
        //     throw err;
        //   }else{
        //     save = true;
        //     return save;
        //   }
        // });

      } else if(selected instanceof TimeSlot) {
        // await this.con.query({
        //   sql: 'INSERT INTO TimeSlot SET idTimeSlot = ?, endTime = ?, startTime = ?',
        //   timeout: 40000,
        //   values: [selected.getId(), selected.getEnd(), selected.getStart()]
        // }, function(err, result, fields) {
        //   if(err) {
        //     throw err;
        //   }else{
        //     save = true;
        //     return save;
        //   }
        // });

      }

      // while(this.wait){
      //   if(save){
      //     console.log(save)
      //   }
      // }

      console.log("OUT OF PROMISE");
      this.disconnect();
      return save;
    }

    public fetch_all_presentations(): Array<Presentation>{
      this.connect();
      let res: Array<Presentation> = [];
      this.con.query("SELECT * FROM Presentation", function(err, result, fields) {
        if(err) throw err;
        res = result;
        console.log(res);
      });
      this.disconnect();
      return res;
    }

    public fetch_all_rooms(): Array<Room>{
      this.connect();
      let res: Array<Room> = [];
      this.con.query("SELECT * FROM Room", function(err, result, fields) {
        if(err) throw err;
        res = result;
        console.log(res);
      });
      this.disconnect();
        return res;
    }

    public fetch_all_speakers(): Array<Speaker>{
      this.connect();
      let res: Array<Speaker> = [];
      this.con.query("SELECT * FROM Speaker", function(err, result, fields) {
        if(err) throw err;
        res = result;
        console.log(res);
      });
      this.disconnect();
        return res;
    }

    public fetch_all_time_slot(): Array<TimeSlot>{
      this.connect();
      let res: Array<TimeSlot> = [];
      this.con.query("SELECT * FROM TimeSlot", function(err, result, fields) {
        if(err) throw err;
        res = result;
        console.log(res);
      });
      this.disconnect();
        return res;
    }

    public delete(selected: ValidatedPresentation | ValidatedRoom | ValidatedPresentation | ValidatedTimeSlot): boolean {
      this.connect();

      let d: boolean = false;

      if (selected instanceof ValidatedPresentation) {
        this.con.query({
          sql: 'DELETE FROM Presentation WHERE idSpeech = ?',
          timeout: 40000,
          values: [selected.getPresentationId()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if (selected instanceof ValidatedRoom) {
        this.con.query({
          sql: 'DELETE FROM Room WHERE idRoom = ?',
          timeout: 40000,
          values: [selected.getId()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if (selected instanceof ValidatedSpeaker) {
        this.con.query({
          sql: 'DELETE FROM Speaker WHERE idSpeaker = ?',
          timeout: 40000,
          values: [selected.getId()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if (selected instanceof ValidatedTimeSlot) {
        this.con.query({
          sql: 'DELETE FROM TimeSlot WHERE idTimeSlot = ?',
          timeout: 40000,
          values: [selected.getId()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      }

      this.disconnect();

      return d;
    }

    private update(selected: ValidatedPresentation | ValidatedRoom | ValidatedSpeaker | ValidatedTimeSlot): boolean {
      this.connect();
      let d: boolean = false;

      if(selected instanceof ValidatedPresentation) {
        this.con.query({
          sql: 'UPDATE Presentation SET presentationSpeaker = ? AND presentationRoom = ? AND presentationTimeSlot =?',
          timeout: 40000,
          values: [selected.getSpeaker(), selected.getRoom(), selected.getTime()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if(selected instanceof ValidatedRoom) {
        this.con.query({
          sql: 'UPDATE Room SET roomName = ? AND roomCapacity = ?',
          timeout: 40000,
          values: [selected.getName(), selected.getCapacity()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if(selected instanceof ValidatedSpeaker) {
        this.con.query({
          sql: 'UPDATE Speaker SET speakerFIrstName = ? AND speakerLastName = ? AND speakerEmail =?',
          timeout: 40000,
          values: [selected.getFirstName(), selected.getLastName(), selected.getEmail()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      } else if(selected instanceof ValidatedTimeSlot) {
        this.con.query({
          sql: 'UPDATE TimeSlot SET endTime = ? AND startTime = ?',
          timeout: 40000,
          values: [selected.getEnd(), selected.getStart()]
        }, function(err, res) {
          if(err) throw err;
          d = true;
        });

      }

      this.disconnect();
      return d;
    }

    private checkExists(selected: Presentation): boolean;
    private checkExists(selected: Room): boolean;
    private checkExists(selected: Speaker): boolean;
    private checkExists(selected: TimeSlot): boolean;

    private checkExists(selected: any): boolean{
        return null
    }

    private delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
  }

}
