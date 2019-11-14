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

console.log("Test")
console.log(dbInt.save(new ValidatedRoom("tevghfkfkfdsafdt", 5)));

