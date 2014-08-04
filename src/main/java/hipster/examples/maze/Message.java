/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hipster.examples.maze;

/**
 *
 * @author joseangel.pineiro
 */
public class Message {
    
    public static final String START = "START";
    public static final String UPDATE = "UPDATE";
    public static final String GET_CONFIG = "GET_CONFIG";
    public static final String MAZES = "mazes";

    public String code;
    
    public String message;
    
    public int maze = 1;
    public int algorithm = 0;
    public int delay = 100 ;
    
    public String[][] mazes;
    

    public Message(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public Message(String code) {
        this.code = code;
        this.message = "";
    }
}
