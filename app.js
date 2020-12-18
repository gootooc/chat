'use strict'
// 해당 파일은 서버 역할을 한다.
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");

const io = socketIO(server); // 채팅 메시지를 받아온다.
//import * as socketIO from "./stocket.io"

app.use(express.static(path.join(__dirname, "src")))

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`server is running ${PORT}`))
//app.listen(PORT, () => console.log(`server is running ${PORT}`)) // 위 구문으로 변경한다.

io.on("connection", (socket) => {
    socket.on("chatting", (data) =>{
        console.log(data);
        io.emit("chatting", `chat server ${data}`)
    });

    //console.log("socket is connected");
})

// npm install -g nodemon