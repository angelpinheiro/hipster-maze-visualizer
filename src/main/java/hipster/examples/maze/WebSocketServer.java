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
        handleMessage(Util.gson.fromJson(message, Message.class));
    }

    @Override
    public void onWebSocketClose(int statusCode, String reason) {
        super.onWebSocketClose(statusCode, reason); //To change body of generated methods, choose Tools | Templates.
        MazeRunner r = runners.get(getSession());
        
        if(r!=null){
            r.stop();
        }
    }

    private void handleMessage(Message m) {
        switch (m.code) {
            case Message.START:
                onStart(m);
                break;
            case "GET_MAZES":

                Message mes = new Message("mazes");
                mes.mazes = Util.mazes;
                String mazes = Util.gson.toJson(mes).toString();
                try {
                    getSession().getRemote().sendString(mazes);
                } catch (IOException ex) {
                    Logger.getLogger(Server.class.getName()).log(Level.SEVERE, null, ex);
                }
                break;
        }
    }

    private void onStart(Message m) {

        MazeRunner runner = runners.get(getSession());

        if (runner != null) {
            runner.stop();
        }

        runner = new MazeRunner();
        runners.put(getSession(), runner);
        runner.run(m, getSession());
    }
}
