/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hipster.examples.maze;

/**
 *
 * @author joseangel.pineiro
 */
public class Commands {
    
    public static final String START = "START";
    public static final String STOP = "STOP";
    public static final String UPDATE = "UPDATE";
    public static final String GET_CONFIG = "GET_CONFIG";
    public static final String CONFIG = "CONFIG";
    
    public static class BaseCommand{
        public String code;

        public BaseCommand() {
        }
        
        public BaseCommand(String code) {
            this.code = code;
        }
    }
    
    public static class StartCommand extends BaseCommand{

        public StartCommand() {
            code = START;
        }
        public int algorithm;
        public int selectedMaze;   
        public int delay;   
        
    }
    
    public static class ConfigCommand extends StartCommand{

        public ConfigCommand() {
            code = CONFIG;
        }
        public String[] algorithms;
        public String[][] mazes;
    }
    
    
    public static class UpdateCommand extends StartCommand{

        public UpdateCommand(String maze) {
            code = UPDATE;
            this.maze = maze;
        }
        public String maze;
    }
    
}
