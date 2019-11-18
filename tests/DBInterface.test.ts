import { Presentation } from "../Presentation_Objects/Presentation";
import { Room } from "../Presentation_Objects/Room";
import { Speaker } from "../Presentation_Objects/Speaker";
import { TimeSlot } from "../Presentation_Objects/TimeSlot";

import { ValidatedPresentation } from "../Presentation_Objects/Validated/ValidatedPresentation";
import { ValidatedRoom } from "../Presentation_Objects/Validated/ValidatedRoom";
import { ValidatedSpeaker } from "../Presentation_Objects/Validated/ValidatedSpeaker";
import { ValidatedTimeSlot } from "../Presentation_Objects/Validated/ValidatedTimeSlot";

import { DatabaseInterface } from "../DatabaseInterface";

let dbInt = new DatabaseInterface();

let room    = new ValidatedRoom(11, "tevghfkfkfdsafdtf", 5);
let speaker = new ValidatedSpeaker(1, "Ron Krawitz", "Big_Ron@hotmail.com");
let time    = new ValidatedTimeSlot(3, new Date(), new Date(5));
let presentation = new ValidatedPresentation(-1, "Test Topic", speaker, time, room)

let rooms;
let timeslots;
let speakers;
let presentations;

// dbInt.save(room).then(value =>{
//     console.log("value")
//     console.log(value)
// }).catch(error =>{
//     console.log("error")
//     console.log(error)
// })

// dbInt.save(speaker).then(value =>{
//     console.log(value)
// }).catch(error =>{
//     console.log(error)
// })

// dbInt.save(time).then(value =>{
//     console.log(value)
// }).catch(error =>{
//     console.log(error)
// })

// dbInt.save(presentation).then(value =>{
//     console.log(value)
// }).catch(error =>{
//     console.log(error)
// })

dbInt.fetch_all_rooms().then(value =>{
    console.log(value)

    rooms = value;

    dbInt.delete(rooms[0]).then(result => {
        console.log(result)
    }).catch(error =>{
        console.log(error)
    })

}).catch(error =>{
    console.log(error)
})


// dbInt.fetch_all_speakers().then(value =>{
//     console.log(value)

//     speakers = value;
// }).catch(error =>{
//     console.log(error)
// })


// dbInt.fetch_all_time_slots().then(value =>{
//     console.log(value)
    
//     timeslots = value;
// }).catch(error =>{
//     console.log(error)
// })

// dbInt.fetch_all_presentations().then(value =>{
//     console.log(value)

//     presentations = value;

//     dbInt.delete(presentations[0]).then(result =>{
//         console.log(result)
//     })

// }).catch(error => {
//     console.log(error)
// })



// dbInt.disconnect()