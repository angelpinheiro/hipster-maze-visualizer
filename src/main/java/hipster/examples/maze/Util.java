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

    public static String[] getMaze(int index) {

        switch (index) {
            case 0:
                return m1;
            case 1:
                return m2;
            case 2:
                return m4;
            case 3:
                return m5;
            case 4:
                return m6;

            default:
                return m1;
        }
    }
    
    public static String[] algorithms = new String[]{
        "Breadth First Search (BFS, non-optimal) ",
        "Bellman Ford",
        "Dijkstra",
        "A*",
        "IDA*"
       
    };


    public static String[] m1 = new String[]{
            "XXSXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XX XXXXXXXXXXXXX     XXXXXXXXXXX",
            "XX    XXXXXXXXXX XXX XX     XXXX",
            "XXXXX  XXXXXX    XXX XX XXX XXXX",
            "XXX XX XXXXXX XX XXX XX  XX XXXX",
            "XXX     XXXXX XXXXXX XXXXXX XXXX",
            "XXXXXXX       XXXXXX        XXXX",
            "XXXXXXXXXX XXXXX XXXXXXXXXXXXXXX",
            "XXXXXXXXXX XX    XXXXX      XXXX",
            "XXXXXXXXXX    XXXXXXXX XXXX XXXX",
            "XXXXXXXXXXX XXXXXXXXXX XXXX XXXX",
            "XXXXXXXXXXX            XXXX XXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXX XX XXXX",
            "XXXXXX              XXXX XX XXXX",
            "XXXXXX XXXXXXXXXXXX XX      XXXX",
            "XXXXXX XXG   XXXXXX XXXX XXXXXXX",
            "XXXXXX XXXXX   XXX            XX",
            "XXXXXX XXXXXXX XXXXXXXXXXX XXXXX",
            "XXXXXX XXXXXXX XXXXXXXXXXXXXXXXX",
            "XXXXXX            XXXXXXXXXXXXXX"
    };

    public static String[] m2 = new String[]{
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XX XXXX      XXX     XXXXXXXXXXX",
            "XX    XXXXXXXXXX XXX XX     XXXX",
            "XX XX                   XXX XXXX",
            "XXX XX XXXXXX XX XXX XX  XX XXXX",
            "XXX     XXXXX XXXXXX XXXXXX XXXX",
            "XXX XXXXXX XX    XXXXXXXXXXXXXXX",
            "XXX XXXXXX XX    XXXXX    G XXXX",
            "XXX XXXXXX    XXXXXXXX XXXX XXXX",
            "XXX XXXXXXX XXXXXXXXXX XXXX XXXX",
            "XXX XXXXXXX                 XXXX",
            "XX XXXXXXXXXXXXXXXXXXXX XX XXXXX",
            "XX XXX              XXXX XX XXXX",
            "XX XXX XXXXXXXXXXXX XX      XXXX",
            "XX XXX XX    XXXXXX XXXX XXXXXXX",
            "XX XXX XXXXX   XXX            XX",
            "XX XXX XXXXXXX XXXXXXXXXXX XXXXX",
            "XXS    XXXXXXX XXXXXXXXXXXXXXXXX",
            "XXXXXX            XXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    };


    public static String[] m4 = new String[]{
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XXX                        XXXXX",
            "XXX XXXXXXXXXXXXXXXXXXXX S XXXXX",
            "XXX XXXXXXXXXXXXXXXXXXXX   XXXXX",
            "XXX XXXXXXXXXXXXXXXXXXXXX XXXXXX",
            "XXX XXXXX                 XXXXXX",
            "XXX XXXXX XXXXXXXXXX XXXXXXXXXXX",
            "XXX XXXXX XXXXXXXXXX XXXXXXXXXXX",
            "XXX XXXXX XXX                XXX",
            "XXX XXXXX XXX XXXXXXXXXXXXXX XXX",
            "XXX XXXXX XXX XX          XX XXX",
            "XXX XXXXX XXX XX XXXXXXXX XX XXX",
            "XXX XXXXX XXX XX XXG   XX XX XXX",
            "XXX XXXXX XXX XX XXXXX XX XX XXX",
            "XXX XXXXX XXX XX      XXX XX XXX",
            "XXX       XXX XXXXXXXXXXX XX XXX",
            "XXXXXXXXX XXX            XXX XXX",
            "XXXXXXXXX XXXXXXXXXXXXXXXXXX XXX",
            "XXXXXXXXX                    XXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

    };

    public static String[] m5 = new String[]{
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XXXX                       SXXXX",
            "XXXXXX  XXXXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXX  XXXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXX  XXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXX  XXXXXXXXXXXXXXXXXXXXX",
            "XXXX                        XXXX",
            "XXXXXXXXXXX  XXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXX  XXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXX  XXXXXXXXXXXXXXXX",
            "XXXX                        XXXX",
            "XXXXXXXXXXXXXXXX  XXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXX  XXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXX  XXXXXXXXXXXX",
            "XXXXG                      XXXXX",
            "XXXXXXXXXXXXXXXXXXXX  XXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXX  XXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXX  XXXXXXXX",
            "XXXX                        XXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

    };

    public static String[] m6 = new String[]{
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XXX XXXXXXX    S     XXXXXX XXXX",
            "XXX XXXXXXX XXXXXXXX  XXXXX XXXX",
            "XXX XXXXXXX XXXXXXXXX  XXXX XXXX",
            "XXX XXXXX               XXX XXXX",
            "XXX XXXXXX    XXXXXXXX  XXX XXXX",
            "XXX XXXXXX   XXXXXXXXXX  XX XXXX",
            "XXX XXXXX  XXXX       XX    XXXX",
            "XXX XXXX  XXXXX             XXXX",
            "XXX                         XXXX",
            "XXXXXXXX XXXXXX XXXXX XXXXXXXXXX",
            "XXXXXXXX XXXXXX XXXXX XXXXX XXXX",
            "XXXX         XX XXXXX XXXXX XXXX",
            "XXXX XXXXXXX XX XXXXX XXXXX XXXX",
            "XXXX XXXXXXX    XXXXX       XXXX",
            "XXXX XXXXXXXXXX XXXXXXXXXXX XXXX",
            "XXXX XXXXXXXXXX XXXXXXXXXXX XXXX",
            "XX       G                  XXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",

    };

    public static String[][] mazes = new String[][]{
            m1,
            m2,
            m4,
            m5,
            m6,
              };
}


