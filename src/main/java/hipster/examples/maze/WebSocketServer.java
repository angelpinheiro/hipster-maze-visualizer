/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hipster.examples.maze;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.WebSocketAdapter;

/**
 *
 * @author joseangel.pineiro
 */
public class WebSocketServer extends WebSocketAdapter {

    Map<Session, MazeRunner> runners = new HashMap<>();

    @Override
    public void onWebSocketText(String message) {
        super.onWebSocketText(message);
        handleMessage(message);
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason) {
        super.onWebSocketClose(statusCode, reason); //To change body of generated methods, choose Tools | Templates.
        MazeRunner r = runners.get(getSession());

        if (r != null) {
            r.stop();
        }
    }

    private void handleMessage(String message) {

        Commands.BaseCommand cmd = Util.gson.fromJson(message, Commands.BaseCommand.class);

        switch (cmd.code) {
            case Commands.START:
                Commands.StartCommand start = Util.gson.fromJson(message, Commands.StartCommand.class);
                onStart(start);
                break;

            case Commands.STOP:
                MazeRunner runner = runners.get(getSession());
                if (runner != null) {
                    runner.stop();
                }
                break;

            case Commands.GET_CONFIG:

                Commands.ConfigCommand cfg = new Commands.ConfigCommand();

                cfg.mazes = Util.mazes;
                cfg.algorithms = Util.algorithms;
                try {
                    getSession().getRemote().sendString(Util.gson.toJson(cfg));
                } catch (IOException ex) {
                    Logger.getLogger(Server.class.getName()).log(Level.SEVERE, null, ex);
                }
                break;
        }
    }

    private void onStart(Commands.StartCommand m) {

        MazeRunner runner = runners.get(getSession());

        if (runner != null) {
            runner.stop();
        }

        runner = new MazeRunner();
        runners.put(getSession(), runner);
        runner.run(m, getSession());
    }
}
