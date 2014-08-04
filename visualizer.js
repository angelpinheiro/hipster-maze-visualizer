/*
 * Maze visualizer code
 */
 
var miniatures = [];
var selectedMaze = 0;
var size = 20;
var ws;
var svg;

var cellTypes = {
  wall: "X",
  empty: " ",
  visited: ".",
  path: "*",
  start: "S",
  goal: "G"
}

/*
 * Draw a maze in a svg, with the specified cellsize
 */
function drawMaze(maze, svg, cellSize){

    var size = {
      width : maze[0].length,
      height : maze.length
    };

    // scale svg
    svg.attr("width", size.width*cellSize).attr("height", size.height*cellSize);

    for(var i = 0; i < size.height;i++){
      for(var j = 0; j < size.width;j++){
        // draw a rectangle for each maze cell
        var cell = svg.append("rect").attr("x", j*cellSize).attr("y", i*cellSize).attr("width", cellSize).attr("height", cellSize);

        switch (maze[i][j]) {
          case cellTypes.empty:
            cell.style("fill", "white");
            break;
          case cellTypes.start:
            cell.style("fill", "green");
            break;
          case cellTypes.goal:
            cell.style("fill", "red");
            break;
          case cellTypes.visited:
            cell.style("fill", "#888");
            break;
          case cellTypes.path:
            cell.style("fill", "#888");
            svg.append("circle").attr("cx", j*cellSize+(cellSize/2)).attr("cy", i*cellSize+(cellSize/2)).attr("r", cellSize/3).style("fill", "#333");
            break;
          default:
            cell.style("fill", "#333");
            break;
        }
      }
    }
}

/*
 * Draw maze miniatures
 */
function drawMiniatures(mazes){
  for(var i=0; i< mazes.length;i++){
    var m = mazes[i];
    var mSvg = d3.select("#miniatures").append("span").attr("class","miniature").attr("mazeIdx",i).append("svg");
    drawMaze(m,mSvg,6);
  }

  $(".miniature").each(function(index,el){
    $(el).on("click",function(){
      $(".miniature").removeClass("selected");
      $(el).addClass("selected");

      var idx = $(el).attr("mazeIdx");
      svg.remove();
      svg=d3.select("#canvas").append("svg");
      drawMaze(mazes[idx],svg,20);
      selectedMaze=idx;

    });
  });
}

/*
 * Create websocket and request mazes on connect
 */
 function initWS()
{
  if (!"WebSocket" in window)
  {
     alert("WebSocket NOT supported by your Browser!");
  }
  else
  {
     // create websocket
     ws = new WebSocket("ws://localhost:8081/mazews");

     // request available mazes on open
     ws.onopen = function()
     {
       ws.send(JSON.stringify(
         {
           code:"GET_MAZES",
           maze: selectedMaze,
           algorithm: $("#algorithm-combo").val(),
           delay: $("#delay").val()
         }));

     };

     // protocol
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        var msg = JSON.parse(received_msg);

        if(msg.code=="update")
        {
          svg.remove();
          svg=d3.select("#canvas").append("svg");
          drawMaze(msg.message.split("\n"), svg , size);
        }
        else if(msg.code=="mazes")
        {
          drawMiniatures(msg.mazes);
        }
     };
     ws.onclose = function()
     {
        // websocket is closed.
        console.log("Connection is closed...");
     };
  }

}

// on document ready, init websocket
$(document).ready(function() {

  // create svg
  svg = d3.select("#canvas").append("svg");

  // setup start button listener
  $("#start-button").on("click", function(){
    console.log($("#algorith-combo").val());

    // sent start command
    ws.send(JSON.stringify(
      {
        code:"START",
        maze: selectedMaze,
        algorithm: $("#algorithm-combo").val(),
        delay: $("#delay").val()
      }));
  });

  initWS();

});
