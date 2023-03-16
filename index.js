const express = require('express');
const app=express();
const cors= require('cors');
const connectdb= require('./config/db');
const user=require("./router/userRouter")
const group=require("./router/groupRouter")

connectdb();
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors:{
    origin:"*"
  }
})


//the cors library for front end know and accept any request from api in node.js
app.use(cors());
app.use(express.urlencoded({extended : true}));
app.use(express.json());
//express.static('upload'), 
app.use(user)
app.use( group)

io.on('connection', (socket) => {
  require('./helpers/init.socket')(socket)
  console.log("new user connected"+socket.id)
  socket.on('disconnect', () => console.log('Client disconnected'));
  require('./helpers/chat')(socket)
  });

app.get("/" ,function(req,res){
    res.send("API is Running ")
});

const PORT= process.env.PORT ||3000;
server.listen(PORT , ()=>console.log(`Server started in port ${PORT}`));