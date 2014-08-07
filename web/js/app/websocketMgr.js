function WebsocketMgr(cfg){

  var socket;
  var url = cfg.url;
  var onUpdate = cfg.onUpdate;
  var onConfig = cfg.onConfig;

  function connect(){

    socket = new WebSocket(url);
    // request available mazes on open
    socket.onopen = function()
    {
      socket.send(JSON.stringify({
         code: Commands.GET_CONFIG
      }));
    };
    // protocol
    socket.onmessage = function (evt)
    {

      var received_msg = evt.data;
      var msg = JSON.parse(received_msg);

      console.log("Msg", msg.code, msg);

      if(msg.code==Commands.UPDATE)
      {
        var mz = msg.maze.split("\n");
        onUpdate(mz);
      }
      else if(msg.code==Commands.CONFIG)
      {
        onConfig({
          algorithms: msg.algorithms,
          mazes: msg.mazes
        })
      }
    };
  }


  return {

    connect: connect,

    socket: function(){
      return socket;
    }

  }





}
