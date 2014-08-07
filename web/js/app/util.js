var Util = {

  getMazeMap: function(mazeArray){
    var map = new Array(mazeArray.length);
    for(var i = 0; i < mazeArray.length; i++){
       map[i] = mazeArray[i].split('');
    }
    return map;
  },

  getPath: function(mazeArray){
      var map = Util.getMazeMap(mazeArray);
      var size = {x: map[0].length, y : map.length};
      var path = [];

      for(var i = 0; i < size.x; i++){
        for (var j = 0; j < size.y;j++){
          if(map[j][i]==cellTypes.path)
            path.push([i,j]);
        }
      }
      return path;
  },


  // generate an array of random cells for testing (not a path)
  // [[x,y],[x,y],...]
  randomPath: function (len,maze){
    var size = maze.size();
    var path = [];
    for(var i = 0; i< len ; i++){
      path.push([parseInt(Math.random()*size.x),parseInt(Math.random()*size.y)]);
    }
    return path;
  },


  getMianureTpl: function(index){

    var id = 'maze-'+index;

    return '<div class="col-sm-2 col-xs-3">' +
             '<a  href="#"  id="'+id+'">' +
              '<div class="miniature-container">' +
               '<div id="svg-'+id+'" class="miniature" mazeIdx="'+index+'">'+
                 '<img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">'+
               '</div>' +
               '</div>' +
             '</a>' +
           '</div>';
  },


  getCellSize: function(maze, containerWidth){
    return (containerWidth-(containerWidth/10)-maze.size().x*2)/maze.size().x; // 750 - margin
  },





  /*
   * Draw maze miniatures
   */
  drawMiniatures: function(mazes){
    for(var i=0; i< mazes.length;i++){
      var m = mazes[i];

      var html = Util.getMianureTpl(i);


      $("#miniatures-section").append("<div id='portfolio-maze-"+i+"'></div>");
      $("#portfolio-maze-"+i)[0].innerHTML=html;

      var cellSize = miniatureWidth / m[0].length;
      var _m = new Maze(m);
      new MazeView(_m, "#svg-maze-"+i,Util.getCellSize(_m,miniatureWidth));
    }
  }

};


var mazeStr = [
  "XXXXXXXXXXXXXXXXXXXXXXX",
  "XX        XXXXXXXXXX XX",
  "XX XXXX    XXXXXXXXX XX",
  "XX XXXXXXX    XXXXXX XX",
  "XS  XXXXXXXXXX    XX XX",
  "XX XXXXXXXXXXXXX     XX",
  "XX           XXX   X   ",
  "XXXXX XXXXXXXX    XXXXX",
  "XXXXX XXXXXXXX   XXXXXX",
  "XXXXX           XXXXXXX",
  "XXXXXXXXX XXX       GXX",
  "XXXXXXXXXXXXXXXXXXXXXXX",
  ];

  var cellTypes = {
    wall: "X",
    empty: " ",
    visited: ".",
    path: "*",
    start: "S",
    goal: "G"
  }

  var COLORS = {
    cell_empty: "white",
    cell_start: "green",
    cell_goal:  "red",
    cell_visited: "#cccccc",
    cell_path: "purple",
    cell_wall: "#333"
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
