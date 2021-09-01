const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname +'/index.html');
});
 
app.use(express.static(__dirname +'/assets'))

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('chat message', (data) => {
    io.emit('chat message', {
      message: data.message,
      name:data.name
    });
  })
});


server.listen(PORT, () => {
  console.log(`Server started on port ... ${PORT}`);
});
