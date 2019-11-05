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

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deletePresentation(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");


console.log("///////////////////////////////////////");
console.log("//               ROOMS               //");
console.log("///////////////////////////////////////");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteRoom(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");


console.log("///////////////////////////////////////");
console.log("//             SPEAKERS              //");
console.log("///////////////////////////////////////");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteSpeaker(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");


console.log("///////////////////////////////////////");
console.log("//               TIMES               //");
console.log("///////////////////////////////////////");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

result = uiInterface.deleteTime(0) ? "Pass" : "Fail";
console.log("Actual:  ", result, "\n");

