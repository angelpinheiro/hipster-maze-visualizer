/*
 * Maze visualizer code
 */

var miniatures = [];
var algorithms = [];
var selectedMaze = 0;
var size = 20;
var miniatureWidth = 300;
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

var Commands = {
  // SEND
  START: "START",
  STOP: "STOP",
  GET_CONFIG: "GET_CONFIG",
  //RECEIVE
  CONFIG: "CONFIG",
  UPDATE: "UPDATE"
};


var COLORS = {
  cell_empty: "white",
  cell_start: "green",
  cell_goal:  "red",
  cell_visited: "#cccccc",
  cell_path: "green"
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
            cell.style("fill", COLORS.cell_empty);
            break;
          case cellTypes.start:
            cell.style("fill", COLORS.cell_start);
            break;
          case cellTypes.goal:
            cell.style("fill", COLORS.cell_goal);
            break;
          case cellTypes.visited:
            cell.style("fill", COLORS.cell_visited);
            break;
          case cellTypes.path:
            cell.style("fill", COLORS.cell_visited);
            svg.append("circle").attr("cx", j*cellSize+(cellSize/2)).attr("cy", i*cellSize+(cellSize/2)).attr("r", cellSize/3).style("fill", COLORS.cell_path);
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

    var html = getMianureTpl(i);

    $("#portfolio-section").append("<div id='portfolio-maze-"+i+"'></div>");
    $("#portfolio-maze-"+i)[0].innerHTML=html;
    var mSvg = d3.select("#svg-maze-"+i).attr("class","miniature").attr("mazeIdx",i).append("svg");
    var cellSize = miniatureWidth / m[0].length;

    drawMaze(m,mSvg,cellSize);
  }

  $(".portfolio-hover").each(function(index,el){
    $(el).on("click",function(){
      var idx = $(el).attr("mazeIdx");
      svg.selectAll("*").remove();
      //svg=d3.select("#canvas").append("svg");
      drawMaze(mazes[idx],svg,20);
      selectedMaze=idx;

    });
  });
}


function getMianureTpl(index){

  var id = 'maze-'+index;

  return '<div id="'+id+'" class="col-md-4 col-sm-6 portfolio-item">'+
      '<a href="#portfolioModal1" class="portfolio-link" data-toggle="modal">'+
      '<div class="portfolio-hover" mazeIdx="'+index+'">'+
      '<div class="portfolio-hover-content">'+
      '<i class="fa fa-plus fa-3x"></i>'+
      '</div>'+
      '</div>'+
      '<div id="svg-'+id+'"></div>'+
      '</a>'+
      '<div class="portfolio-caption">'+
      '<h5>Maze '+index+'</h5>'+
      '</div>'+
      '</div>';
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
     ws = new WebSocket("ws://172.16.243.11:8080/web/mazews");

     // request available mazes on open
     ws.onopen = function()
     {
       ws.send(JSON.stringify(
         {
           code: Commands.GET_CONFIG
         }));

     };

     // protocol
     ws.onmessage = function (evt)
     {
        var received_msg = evt.data;
        var msg = JSON.parse(received_msg);

        if(msg.code==Commands.UPDATE)
        {
          svg.remove();
          svg=d3.select("#canvas").append("svg");
          drawMaze(msg.maze.split("\n"), svg , size);
        }
        else if(msg.code==Commands.CONFIG)
        {
          algorithms = msg.algorithms;
          drawMiniatures(msg.mazes);

          console.log(algorithms);

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
    //console.log($("#algorith-combo").val());

    console.log("SelectedMaze:", selectedMaze);
    // sent start command
    ws.send(JSON.stringify(
      {
        code:Commands.START,
        selectedMaze: selectedMaze,
        algorithm: $("#algorithms").val(),
        delay: 100,//$("#delay").val()
      }));
  });

  $("#stop-button").on("click", function(){
    // sent start command
    ws.send(JSON.stringify(
      {
        code:Commands.STOP
      }));
  });

  initWS();

});
