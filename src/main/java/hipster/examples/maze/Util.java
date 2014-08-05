/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hipster.examples.maze;

import com.google.gson.Gson;
import es.usc.citius.hipster.util.examples.maze.Mazes;

/**
 *
 * @author angelpinheiro
 */
public class Util {

    public static Gson gson = new Gson();
    
    public static String[][] mazes = new String[][]{
        Mazes.exampleMaze1,
        Mazes.testMaze1,
        Mazes.testMaze2,
        Mazes.testMaze3,
        Mazes.testMaze4,
        Mazes.testMaze5
    };

    public static String[] getMaze(int index) {

        switch (index) {
            case 0:
                return Mazes.exampleMaze1;
            case 1:
                return Mazes.testMaze1;
            case 2:
                return Mazes.testMaze2;
            case 3:
                return Mazes.testMaze3;
            case 4:
                return Mazes.testMaze4;
            case 5:
                return Mazes.testMaze5;
            default:
                return Mazes.exampleMaze1;
        }
    }
    
    public static String[] algorithms = new String[]{
        "Breadth First Search (BFS, non-optimal) ",
        "Bellman Ford",
        "Dijkstra",
        "A*",
        "IDA*"
       
    };
}


