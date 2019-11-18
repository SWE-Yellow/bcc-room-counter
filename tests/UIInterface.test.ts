import UIInterface from '../UIInterface';
import DatabaseInterface from "./mocks/DatabaseInterfaceMock"
import { Room } from '../Presentation_Objects/Room';
import { ValidatedRoom } from '../Presentation_Objects/Validated/ValidatedRoom';
import { Presentation } from '../Presentation_Objects/Presentation';

let dbInt = new DatabaseInterface();

let uiInterface: UIInterface = new UIInterface();
let result: string;

/*
TO RUN TEST: 
Replace import for DatabaseInterface in UIInterface with:
    import DatabaseInterface from "./tests/mocks/DatabaseInterfaceMock";
*/

setTimeout(function(){ 
    uiInterface.saveRoom(-1, "Testrewqnj", 911).then(value => {
        console.log(value)
    })

    uiInterface.saveRoom(-1, "Testijnkjnkjnng", 10).then(value => {
        console.log(value)
    })

    uiInterface.saveSpeaker(-1, "Name2", "email2@test.com").then(value => {
        console.log(value)
    })

    uiInterface.saveSpeaker(-1, "Yay", "email2@email2.com").then(value => {
        console.log(value)
    })

    uiInterface.saveTime(-1, new Date(4321832), new Date(435215321532)).then(value => {
        console.log(value)
    })

    uiInterface.saveSpeaker(-1, ";DELETE  FROM room--", "email42@email.edu").then(value => {
        console.log(value)
    })

    

    setTimeout(function(){
        uiInterface.savePresentation(-1, "Math", 0, 0, 0).then( (result) => {
            console.log(result);
        });
    }, 50)
    

    // uiInterface.deleteRoom(0).then(value => {
    //     console.log(value)
    // })

    // uiInterface.deleteSpeaker(0).then(value => {
    //     console.log(value)
    // })

    // uiInterface.deleteTime(0).then(value => {
    //     console.log(value)
    // })

    // uiInterface.deletePresentation(0).then(value => {
    //     console.log(value)
    // })

    // uiInterface.fetchRooms().then(value =>{
    //     console.log(value)
    // })

    // uiInterface.fetchSpeakers().then(value =>{
    //     console.log(value)
    // })

    // uiInterface.fetchTimes().then(value =>{
    //     console.log(value)
    // })

    // uiInterface.fetchPresentations().then(value =>{
    //     console.log(value)
    // })

    setTimeout(function(){
        uiInterface.disconnect()
    }, 1000);
}, 500);



// console.log(uiInterface.fetchRooms())
// console.log(uiInterface.fetchSpeakers())
// console.log(uiInterface.fetchTimes())
// console.log(uiInterface.fetchPresentations())

/** 

console.log("///////////////////////////////////////");
console.log("//           PRESENTATIONS           //");
console.log("///////////////////////////////////////");

console.log("\n///// Save /////\n")

result = uiInterface.savePresentation(-1, "TestTopic1", 0, 0, 0) ? "Pass" : "Fail";
console.log("\tExpected: Pass")
console.log("\tActual: ", result, "\n")

result = uiInterface.savePresentation(0, "", 0, 0, 0) ? "Pass" : "Fail";
console.log("\tActual: ", result, "\n")

dbInt.numSave = 0;

console.log("\n///// Delete /////\n");

console.log("Negative Index:\n");
result = uiInterface.deletePresentation(-1) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("Index > length:\n");
result = uiInterface.deletePresentation(10) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("With DatabaseInterface Mock:\n");
result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");


console.log("\n");
console.log("///////////////////////////////////////");
console.log("//               ROOMS               //");
console.log("///////////////////////////////////////");


console.log("\n///// Save /////\n")

result = uiInterface.saveRoom(-1, "TestRoom1", 40) ? "Pass" : "Fail";
console.log("\tExpected: Pass")
console.log("\tActual: ", result, "\n")

result = uiInterface.saveRoom(0, "", 0) ? "Pass" : "Fail";
console.log("\tActual: ", result, "\n")

dbInt.numSave = 0;


console.log("\n", "///// Delete /////", "\n");

console.log("Negative Index:\n");
result = uiInterface.deleteRoom(-1) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("Index > length:\n");
result = uiInterface.deleteRoom(10) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("With DatabaseInterface Mock:\n");
result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");


console.log("\n");
console.log("///////////////////////////////////////");
console.log("//             SPEAKERS              //");
console.log("///////////////////////////////////////");


console.log("\n///// Save /////\n")

result = uiInterface.saveSpeaker(-1, "Name", "Last", "Email") ? "Pass" : "Fail";
console.log("\tExpected: Pass")
console.log("\tActual: ", result, "\n")

result = uiInterface.saveSpeaker(0, "", "", "") ? "Pass" : "Fail";
console.log("\tActual: ", result, "\n")

dbInt.numSave = 0;


console.log("\n", "///// Delete /////", "\n");

console.log("Negative Index:\n");
result = uiInterface.deleteSpeaker(-1) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("Index > length:\n");
result = uiInterface.deleteSpeaker(10) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("With DatabaseInterface Mock:\n");
result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");


console.log("\n");
console.log("///////////////////////////////////////");
console.log("//               TIMES               //");
console.log("///////////////////////////////////////");

console.log("\n///// Save /////\n")

result = uiInterface.saveTime(-1, new Date(0), new Date(1)) ? "Pass" : "Fail";
console.log("\tExpected: Pass")
console.log("\tActual: ", result, "\n")

result = uiInterface.saveTime(0, new Date(5), new Date(6)) ? "Pass" : "Fail";
console.log("\tActual: ", result, "\n")

dbInt.numSave = 0;

console.log("\n", "///// Delete /////", "\n");

console.log("Negative Index:\n");
result = uiInterface.deleteTime(-1) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("Index > length:\n");
result = uiInterface.deleteTime(10) ? "Pass" : "Fail";
console.log("\tExpected: Fail");
console.log("\tActual:  ", result, "\n");

console.log("With DatabaseInterface Mock:\n");
result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("\tActual:  ", result, "\n");

*/