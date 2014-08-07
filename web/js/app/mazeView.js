/**
 * Maze model
 */

function MazeView(maze, el, cellSize){

  var htmlCfg = {
    container:"div",
    row:{
      el: "div",
      cls: "maze-row"
    },
    cell:{
      el: "span",
      cls: "cell"
    }
  };

  var svgCfg = {
    container:"svg",
    row:{
      el: "g",
      cls: "row"
    },
    cell:{
      el: "rect",
      cls: "cell"
    }
  };

  var drawCfg = htmlCfg;

  function getCellColor(c,i,j){


    if(c==cellTypes.empty){
      return COLORS.cell_empty;
    }else if(c==cellTypes.start){
      return COLORS.cell_start;
    }else if(c==cellTypes.goal){
      return COLORS.cell_goal;
    }else if(c==cellTypes.path){
      return COLORS.cell_path;
    }else if(c==cellTypes.visited){
      return COLORS.cell_visited;
    }else{
      return COLORS.cell_wall;
      //return wallRamp(i+j);
    }
  }


  function getCellClass(c){
    if(c==cellTypes.empty){
      return "cell_empty";
    }else if(c==cellTypes.start){
      return "cell_start";
    }else if(c==cellTypes.goal){
      return "cell_goal";
    }else if(c==cellTypes.path){
      return "cell_path";
    }else if(c==cellTypes.visited){
      return "cell_visited";
    }else{
      return "cell_wall";
    }
  }


  function createContainer(el){
    return d3.select(el)
      .append(drawCfg.container)
      .attr("class","maze")
      .attr("width",cellSize*maze.size().x)
      .attr("heigth",cellSize*maze.size().y);
  }

  var _el = el;
  var _maze = maze;
  var _container = createContainer(el);

  var rows;
  var cells;

  function buildMap(){

    clean();

    rows = _container.selectAll("." + drawCfg.row.cls)
        .data(maze.getInitialState())
        .enter()
        .append(drawCfg.row.el)
        .attr("class",drawCfg.row.cls);

    cells = rows.selectAll(drawCfg.row.el)
        .data(function(d){return d;})
        .enter()
        .append(drawCfg.cell.el)
        .attr("id",function(d,i,j){return "cell-"+i+"-"+j;})
        .attr("x",function(d,i,j){return i*cellSize;})
        .attr("y",function(d,i,j){return j*cellSize;})
        .attr("style", function(d,i,j){
          return "width:"+cellSize+"px;height:"+cellSize+"px;background:"+getCellColor(d,i,j)+";"
        })
        .attr("class", function(d,i,j){return getCellClass(d,i,j);});
        //.html(function(d,i,j){return "<i>"+d+"</i>";});
  };

  function clean(){
    d3.select(_el).html("");
    _container = createContainer(el);
  }


  function getCellIds(indexArray){

      var ids = [];
      for(var i = 0; i <indexArray.length;i++){
        var position = indexArray[i];
        ids.push("#cell-"+position[0]+"-"+position[1])
      }
      return ids;
  }



  buildMap();


  return{

    el: el,

    redraw: function(){
      buildMap();
    },

    cells: function(){
      return cells;
    },

    // maze listener
    onUpdate: function(){

          console.log("Draw!");
      // uncoment for draw the whole map

      // clean();
      // buildMap();
      // return;


      var path = _maze.getPath();
      var previousPath = _maze.getPreviousPath();

      previousIds = getCellIds(previousPath);
      pathIds = getCellIds(path);


      colorRamp = d3.scale.linear().domain([0,pathIds.length*2]).range(["purple","orange"]);
      radiusRamp = d3.scale.linear().domain([0,pathIds.length*2]).range([50,0]);

      // set last path as visited
      for(var i=0 ; i < previousIds.length;i++){
        var p = previousIds[i];
        d3.select(el).selectAll(p)
          .data(["."])
          .style("background", COLORS.cell_visited)
          .style("border-radius", "50%")
          .attr("class", "cell_visited")


      }

      // update current path
      for(var i=0 ; i < pathIds.length;i++){
        var p = pathIds[i];
        d3.select(el).select(p)
          .data(["*"])
          .attr("class", "cell_path")
          .style("background", colorRamp(i))
          //.style("border-radius", radiusRamp(i)+"%")
          .style("-webkit-transition", "0.2s")
      }
    }
  }
}
