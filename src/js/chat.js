'use strict'
const socket = io();

socket.emit("chatting", "form  front");

socket.on("chatting", (data) =>{
    console.log(data);
});


console.log(socket);