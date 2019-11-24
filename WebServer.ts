import * as fastify from 'fastify'
import { DatabaseInterface } from "./DatabaseInterface";
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({})

const databaseInterface:DatabaseInterface = new DatabaseInterface();

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

server.get('/saveTimeslot', (request, reply) => {
    var timeslot:ValidatedTimeSlot = new ValidatedTimeSlot(request.params.uid, request.params.startTime, request.params.endTime);
    if (timeslot.validate()) {
        databaseInterface.save(timeslot);
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

server.get('/updateTimeslot', (request, reply) => {
    var timeslot:ValidatedTimeSlot = new ValidatedTimeSlot(request.params.uid, request.params.startTime, request.params.endTime);
    if (timeslot.validate()) {
        databaseInterface.update_time_slot(timeslot);
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
