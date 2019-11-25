import * as fastify from 'fastify'
import { DatabaseInterface } from "./DatabaseInterface";
import { Server, IncomingMessage, ServerResponse } from 'http'

import { Room } from "./Presentation_Objects/Room";

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

server.get('/createRoom', (request, reply) => {
  let room: Room = new Room(request.params.uid, request.params.roomName, request.params.roomCapacity);
  databaseInterface.save(room).then(
    (room) => {
      reply.code(200).send(JSON.stringify(room));
    },
    (err) => {
      server.log.error(err);
      reply.code(500).send(err);
    }
  );
});

server.get('/deleteRoom', (request, reply) => {
  let room: Room = new Room(request.params.uid, request.params.roomName, request.params.roomCapacity);
  databaseInterface.delete(room).then(
    (room) => {
      reply.code(200).send(JSON.stringify(room));
    },
    (err) => {
      server.log.error(err);
      reply.code(500).send(err);
    }
  );

});

server.get('/updateRoom', (request, reply) => {
  let room: Room = new Room(request.params.uid, request.params.roomName, request.params.roomCapacity);
  databaseInterface.update_room(room).then(
    (room) => {
      reply.code(200).send(JSON.stringify(room));
    },
    (err) => {
      server.log.error(err);
      reply.code(500).send(err);
    }
  );
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
