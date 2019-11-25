import UIInterface from '../UIInterface';
import DatabaseInterface from "./mocks/DatabaseInterfaceMock"
import { Room } from '../Presentation_Objects/Room';
import { ValidatedRoom } from '../Presentation_Objects/Validated/ValidatedRoom';
import { Presentation } from '../Presentation_Objects/Presentation';

let dbInt = new DatabaseInterface();

let uiInterface: UIInterface = new UIInterface();
let result: string;


setTimeout(function(){ 
    uiInterface.saveRoom(-1, "Wentworth 102", 911).then(value => {
        console.log(value)
    })

    uiInterface.saveRoom(-1, "Dobbs 304", 10).then(value => {
        console.log(value)
    })

    uiInterface.saveSpeaker(-1, "Hunter Wintle", "wintleh@wit.edu").then(value => {
        console.log(value)
    })

    uiInterface.saveSpeaker(-1, "Bart Simpson", "eat_my_shorts@hotmail.com").then(value => {
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
    


    setTimeout(function(){
        uiInterface.disconnect()
    }, 1000);
}, 500);
