'use strict'
// 해당 파일은 서버 역할을 한다.
const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment");


const io = socketIO(server); // 채팅 메시지를 받아온다.
//import * as socketIO from "./stocket.io"

app.use(express.static(path.join(__dirname, "src")));

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
    socket.on("chatting", (data) =>{
        console.log(data);
        const { name, msg } = data;
        io.emit("chatting", {
            // name: name,
            // msg: msg,
            name,
            msg,
            time: moment(new Date()).format("h:ss A"),
        });
    });
})


server.listen(PORT, () => console.log(`server is running ${PORT}`));
//app.listen(PORT, () => console.log(`server is running ${PORT}`)) // 위 구문으로 변경한다.


// npm install -g nodemon

// ngrok 로 호스팅 할 수 있다.
//npm install -g ngrok