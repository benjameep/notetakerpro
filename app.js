var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/listen.html');
});
app.get('/boss', function(req, res){
  res.sendFile(__dirname + '/emit.html');
});
app.get('/abbrevs', function(req, res){
  res.sendFile(__dirname + '/abbrevs');
});

io.on('connection', function(socket){
  socket.on('msg', function(data){
    io.emit('msg', data)
  })
  // socket.on('create', function(namespace){
  //   var room = io.of('/'+namespace) 
  //   socket.on('splice',(pos,del,val) => {
  //     room.emit('splice',pos,del,val)
  //   })
  // })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});