/**
 * Maze model
 */
function Maze(mazeString, miniature){

  var listener = null;

  var miniature = miniature==true?true:false;

  function initialize(mazeArray){
    var map = new Array(mazeArray.length);
    for(var i = 0; i < mazeArray.length; i++){
      map[i] = mazeArray[i].split('');
    }
    return map;
  };

  var initialState = initialize(mazeString);
  var currentState = initialize(mazeString);
  var path = [];
  var previousPath = [];

  var size = {
      x: initialState[0].length,
      y: initialState.length
  };

  return{

    isMiniature: function(){
      return miniature;
    },

    getInitialState: function(){
        return initialState;
    },

    getCurrentState: function(){
      return currentState;
    },

    getAt: function(x,y){
      return currentState[x][y];
    },

    isNextToPath: function(x,y){

      var xFrom = Math.max(0,x-1);
      var xTo = Math.min(size.x,x+1);

      var yFrom = Math.max(0,y-1);
      var yTo = Math.min(size.y,y+1);

      for(var i = xFrom; i< xTo;i++){
        console.log("x",i)
        for(var j = yFrom; j < yTo;j++){
          if(initialState[j][i]==cellTypes.empty){
            return true;
          }
        }
      }

      return false;

    },

    getPath: function(){
      return path;
    },

    getPreviousPath: function(){
      return previousPath;
    },

    updatePath: function(newPath){
      previousPath = path.slice();
      path = newPath;

      for(var i = 0; i < previousPath.length; i++){
        var pathEl = previousPath[i];
        currentState[pathEl[1]][pathEl[0]] = initialState[pathEl[1]][pathEl[0]];
      }

      for(var i = 0; i < path.length;i++){
        var pathEl = path[i];
        currentState[pathEl[1]][pathEl[0]] = "*";
      }

      if(listener && listener.onUpdate)
        listener.onUpdate();

    },

    toString: function(){
      var result = "";
      for(var i = 0; i < size.y; i++){
        result += currentState[i].join("") + "\n";
      }
      return result;
    },

    mapToString: function(){
      var result = "";
      for(var i = 0; i < size.y; i++){
        result += initialState[i].join("") + "\n";
      }
      return result;
    },

    setListener: function(l){
      listener=l;
    },

    size: function(){
      return size;
    }

  }
}
