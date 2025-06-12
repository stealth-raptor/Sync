import { Server } from "socket.io"

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders:["*"],
            credentials:true
        }
    });

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {

            //if noboady else has connected initialise that connection array
            if (connections[path] === undefined) {
                connections[path] = []
            }

            //add new socket to that connection
            connections[path].push(socket.id);
            //keep note of time online
            timeOnline[socket.id] = new Date();

            //notify everyone else in the room that a new guy has joined
            for (let i = 0; i < connections[path].length; i++) {
                io.to(connections[path][i]).emit("user-joined", socket.id, connections[path]);
            }

            //send all the old stored mssgs(if any) to only the new user who has joined
            if (messages[path] != undefined) {
                for (let i = 0; i < messages[path].length; i++) {
                    io.to(socket.id).emit("chat-message", messages[path][i]['data'], messages[path][i]['sender'], messages[path][i]['socket-id-sender'])
                }
            }
        })

        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })

        socket.on("chat-message", (data, sender) => {
            //find the matching room where this socket is present
            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([matchingRoom, isFound], [roomKey, roomValue]) => {
                    //it goes through each room and finds whether that room can be found or not
                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];
                }, ['', false]);

            //now that our room exists
            if (found === true) {
                //initialise the messages array
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = [];
                }

                //push the new mssg to the array
                messages[matchingRoom].push({ "sender": sender, "data": data, "socket-id-sender": socket.id });
                console.log("message", ":", sender, data);

                //broadcast this message to every person on the room
                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id);
                })
            }
        })

        socket.on("disconnect", () => {
            //caluclates the time for whic the user for connected
            var diffTime = Math.abs(timeOnline[socket.id] - new Date());

            var key;
            //these loops finds the room for the disconnected socket
            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {
                for (let i = 0; i < v.length; i++) {
                    //saves room for that particular socket
                    if (v[i] === socket.id) {
                        key = k;
                        //notifies everyone else in the room that this dude left
                        for (let j = 0; j < connections[key].length; j++) {
                            io.to(connections[key][j]).emit("user-left", socket.id);
                        }
                        //finds the index of that dude and removes his socket from the connections array
                        var index = connections[key].indexOf(socket.id);

                        connections[key].splice(index, 1);

                        //if no one is in the room then we delete that room
                        if (connections[key].length === 0) {
                            delete connections[key];
                        }
                    }
                }
            }
        })
    })

    return io;
}

