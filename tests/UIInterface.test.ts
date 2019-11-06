import UIInterface from '../UIInterface';
import { Room } from '../Presentation_Objects/Room';
import { ValidatedRoom } from '../Presentation_Objects/Validated/ValidatedRoom';

let uiInterface: UIInterface = new UIInterface("", "");
let result: string;

/*
TO RUN TEST: 
Replace import for DatabaseInterface in UIInterface with:
    import DatabaseInterface from "./tests/mocks/DatabaseInterfaceMock";
*/


console.log("///////////////////////////////////////");
console.log("//           PRESENTATIONS           //");
console.log("///////////////////////////////////////");

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

