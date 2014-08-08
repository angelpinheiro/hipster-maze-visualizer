// ------------------------------------------------ //
// APP START
// ------------------------------------------------ //
var wsUrl = "ws://localhost:8080/web/mazews";
var cellSize = 15;
var _maze;
var mazeView;

var miniatureWidth = 250;

var selectedMaze = window.location.hash.replace("#","") || 2;

var socketCfg = {

    url: wsUrl,

    onConfig: function(cfg){
        console.log("Creating maze");

        mazes = cfg.mazes;

        Util.drawMiniatures(cfg.mazes);

        $(".miniature").each(function(index,el){

          $(el).on("click",function(){

            var idx = $(el).attr("mazeIdx");
            $("#canvas").html("");

            selectedMaze=idx;

            _maze = new Maze(mazes[selectedMaze]);
            _mazeView = new MazeView(_maze,"#canvas", Util.getCellSize(_maze, 730));
            // view vill repaint ou update maze
            _maze.setListener(_mazeView);
          });
        });

        algorithms = cfg.algorithms;

        for(var i =0; i< algorithms.length;i++){
          $("#algorithms").append($('<option>', {
              value: i,
              text: algorithms[i]
          }));
        }

        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 10
        });



    },

    onUpdate: function(mazeArray){
        console.log("Update");
        var path = Util.getPath(mazeArray);
        _maze.updatePath(path);

    }

};

// on document ready, init websocket
$(document).ready(function() {

  var ws = new WebsocketMgr(socketCfg);

  // setup start button listener
  $("#start-button").on("click", function(){

    console.log("SelectedMaze:", selectedMaze);
    // sent start command
    _mazeView.redraw();
    ws.socket().send(JSON.stringify(
          {
            code:Commands.START,
            selectedMaze: selectedMaze,
            algorithm: $("#algorithms").val(),
            delay: 100
          }));
  });

  $("#stop-button").on("click", function(){
    // sent start command
    ws.socket().send(JSON.stringify(
      {
        code:Commands.STOP
      }));
  });

  ws.connect();

});
