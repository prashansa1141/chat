const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app); //for node js server

//creating server inside it is for socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", //vite uses this port number
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.id}`);

  socket.on("send-message", (message) => {
    console.log(message);
    io.emit("received-message", message); // Corrected event name
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(5000, () => console.log("server running at port 5000"));
