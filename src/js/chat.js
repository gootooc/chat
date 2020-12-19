'use strict'
const socket = io();

const nickname = document.querySelector("#nickname");
const chatInput = document.querySelector(".chatting-input");
const sendButton = document.querySelector('.send-button');
const chatList = document.querySelector('.chatting-list');
const displayContainer = document.querySelector('.display-container');


const send = () => {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }

    socket.emit("chatting", param);
}


sendButton.addEventListener("click", send );

chatInput.addEventListener('keypress',(evt) =>{
    if(evt.keyCode === 13){
        send();
        
    }
})



//socket.emit("chatting", "form  front");

socket.on("chatting", (data) =>{
    const { name, msg, time } = data;
    const item = new LIModel(name, msg, time);
    item.makeLi();
    displayContainer.scrollTo(0, displayContainer.scrollHeight);
    // const li = document.createElement("li");
    // li.innerText = `${data.name} 님이 - ${data.msg}`;
    // chatList.appendChild(li);
    // console.log(data);
});


function LIModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received");
        const dom = ` <span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="https:placeimg.com/50/50/any" alt="icon" />
        </span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;

        li.innerHTML = dom;
        chatList.appendChild(li);

        chatInput.value = "";
        chatInput.focus();
        
    }
}