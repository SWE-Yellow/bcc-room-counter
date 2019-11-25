import * as fastify from 'fastify'
import { DatabaseInterface } from "./DatabaseInterface";
import { Server, IncomingMessage, ServerResponse } from 'http'
import { ValidatedPresentation } from './Presentation_Objects/Validated/ValidatedPresentation';
import { ValidatedTimeSlot } from "./Presentation_Objects/Validated/ValidatedTimeSlot";
import { ValidatedSpeaker } from './Presentation_Objects/Validated/ValidatedSpeaker'
import { ValidatedRoom } from './Presentation_Objects/Validated/ValidatedRoom';
import { Room } from './Presentation_Objects/Room';
import { Speaker } from './Presentation_Objects/Speaker';
import { TimeSlot } from './Presentation_Objects/TimeSlot';


const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

const databaseInterface:DatabaseInterface = new DatabaseInterface();

server.get('/getPresentations', (request, reply) => {
    databaseInterface.fetch_all_presentations().then(
        (presentations) => {
            reply.code(200).send(JSON.stringify(presentations));
        },
        (err) => {
            server.log.error(err);
            reply.code(500).send(err);
        }
    );
});

server.get('/savePresentation', (request, reply) => {
    var speaker:Speaker = null;
    var room:Room = null;
    var timeSlot:TimeSlot = null;

    databaseInterface.fetch_all_rooms().then (
        (rooms) => {
            for (var i=0; i<rooms.length; i++) {
                if (rooms[i].getId() == request.params.presentationRoom) {
                    room = rooms[i];
                    return databaseInterface.fetch_all_speakers();
                }
            }
            throw new Error("Invalid room ID given");
        }
    ).then (
        (speakers) => {
            for (var i=0; i<speakers.length; i++) {
                if (speakers[i].getId() == request.params.presentationSpeaker) {
                    speaker = speakers[i];
                    return databaseInterface.fetch_all_time_slots();
                }
            }
            throw new Error("Invalid speaker ID given");
        }
    ).then (
        (timeslots) => {
            for (var i=0; i<timeslots.length; i++) {
                if (timeslots[i].getId() == request.params.presentationTimeSlot) {
                    timeSlot = timeslots[i];
                    return;
                }
            }
            throw new Error("Invalid timeslot ID given");
        }
    ).then (
        () => {
            var presentation:ValidatedPresentation = new ValidatedPresentation(
                request.params.uid, request.params.topic, speaker, timeSlot, room
            );
            if (presentation.validate()) {
                reply.code(200).send("true");
            } else{
                reply.code(200).send("false");
            }
        }
    ).catch(
        (err:Error) => {
            reply.code(500).send(err.message);
        }
    )
});

server.get('/getRooms', (request, reply) => {
    databaseInterface.fetch_all_rooms().then(
        (rooms) => {
            reply.code(200).send(JSON.stringify(rooms));
        },
        (err) => {
            server.log.error(err);
            reply.code(500).send(err);
        }
    );
});

server.get('/deletePresentation', (request, reply) => {

});


server.get('/getTimeslots', (request, reply) => {
    databaseInterface.fetch_all_time_slots().then(
        (timeslots) => {
            reply.code(200).send(JSON.stringify(timeslots));
        },
        (err) => {
            server.log.error(err);
            reply.code(500).send(err);
        }
    );
});

server.get('/getSpeakers', (request, reply) => {
    databaseInterface.fetch_all_speakers().then(
        (speakers) => {
            reply.code(200).send(JSON.stringify(speakers));
        },
        (err) => {
            server.log.error(err);
            reply.code(500).send(err);
        }
    );
});




server.get('/saveRoom', (request, reply) => {
    var room:ValidatedRoom = new ValidatedRoom(request.params.uid, request.params.roomName, request.params.roomCapacity);
    if (room.validate()) {
        databaseInterface.save(room);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/saveTimeslot', (request, reply) => {
    var timeslot:ValidatedTimeSlot = new ValidatedTimeSlot(request.params.uid, request.params.startTime, request.params.endTime);
    if (timeslot.validate()) {
        databaseInterface.save(timeslot);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/saveSpeaker', (request, reply) => {
    var speaker:ValidatedSpeaker = new ValidatedSpeaker(request.params.uid, request.params.speakerName, request.params.speakerEmail);
    if (speaker.validate()) {
        databaseInterface.save(speaker);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

//http://localhost/deletePresentation?uid=1&presentationSpeaker=23&presentationRoom=13&presentationTimeSlot=32&topic=Ronsfavoritethings

server.get('/deletePresentation', (request, reply) => {
    var presentation:ValidatedPresentation = new ValidatedPresentation(
        request.params.uid, request.params.topic, null, null, null
    );//luckily only the topic and uid needs validation so, I dont need to go through the fresh hell that was save again
    if (presentation.validate()) {
        databaseInterface.delete(presentation);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    }
})

server.get('/deleteRoom', (request, reply) => {
    var room:ValidatedRoom = new ValidatedRoom(request.params.uid, request.params.roomName, request.params.roomCapacity);
    if (room.validate()) {
        databaseInterface.delete(room);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/deleteTimeslot', (request, reply) => {
    var timeslot:ValidatedTimeSlot = new ValidatedTimeSlot(request.params.uid, request.params.startTime, request.params.endTime);
    if (timeslot.validate()) {
        databaseInterface.delete(timeslot);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/deleteSpeaker', (request, reply) => {
    var speaker:ValidatedSpeaker = new ValidatedSpeaker(request.params.uid, request.params.speakerName, request.params.speakerEmail);
    if (speaker.validate()) {
        databaseInterface.delete(speaker);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});




server.get('/updateRoom', (request, reply) => {
    var room:ValidatedRoom = new ValidatedRoom(request.params.uid, request.params.roomName, request.params.roomCapacity);
    if (room.validate()) {
        databaseInterface.update_room(room);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/updateTimeslot', (request, reply) => {
    var timeslot:ValidatedTimeSlot = new ValidatedTimeSlot(request.params.uid, request.params.startTime, request.params.endTime);
    if (timeslot.validate()) {
        databaseInterface.update_time_slot(timeslot);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});

server.get('/updateSpeaker', (request, reply) => {
    var speaker:ValidatedSpeaker = new ValidatedSpeaker(request.params.uid, request.params.speakerName, request.params.speakerEmail);
    if (speaker.validate()) {
        databaseInterface.update_speaker(speaker);
        reply.code(200).send("true");
    } else{
        reply.code(200).send("false");
    } 
});



server.get('/ping', (request, reply) => {
    reply.code(200).send("pong");
});

server.listen(80, (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    server.log.info(`server listening on ${address}`)
});