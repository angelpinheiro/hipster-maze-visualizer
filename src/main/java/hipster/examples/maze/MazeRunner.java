/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package hipster.examples.maze;

import com.google.common.base.Function;
import com.google.common.collect.Lists;
import com.google.gson.Gson;
import es.usc.citius.hipster.algorithm.Hipster;
import es.usc.citius.hipster.model.Node;
import es.usc.citius.hipster.model.Transition;
import es.usc.citius.hipster.model.function.CostFunction;
import es.usc.citius.hipster.model.function.HeuristicFunction;
import es.usc.citius.hipster.model.function.impl.StateTransitionFunction;
import es.usc.citius.hipster.model.impl.WeightedNode;
import es.usc.citius.hipster.model.problem.ProblemBuilder;
import es.usc.citius.hipster.model.problem.SearchProblem;
import es.usc.citius.hipster.util.examples.maze.Maze2D;
import es.usc.citius.hipster.util.examples.maze.Mazes;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.swing.Timer;

import org.eclipse.jetty.websocket.api.Session;

/**
 *
 * @author joseangel.pineiro
 */
public class MazeRunner {

    Session socket;
    AlgorithmListener listener;

    public void run(Message msg , Session session) {

        this.socket = session;

        Maze2D maze = new Maze2D(Util.getMaze(msg.maze));
        Iterator<? extends Node<?, Point, ?>> iterator = createAlgorithm(maze, msg.algorithm);
        listener = new AlgorithmListener(iterator, maze, session, msg.delay);
        listener.startTimer();

    }

    protected void updateMaze(String mazeString) {
        if (socket.isOpen()) {
            try {
                socket.getRemote().sendString(Util.gson.toJson(new Message("update", mazeString)));
                socket.getRemote().flush();
            } catch (IOException ex) {
                Logger.getLogger(MazeRunner.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

    }
    
    public void stop(){
        if(listener!=null)
            listener.stopTimer();
    }

    private class AlgorithmListener implements ActionListener {

        private Iterator<? extends Node<?, Point, ?>> algorithmIterator;
        private Collection<Point> explored = new HashSet<>();
        private Maze2D maze;
        private Timer timer;
        Session socket;
        Gson gson = new Gson();

        private AlgorithmListener(Iterator<? extends Node<?, Point, ?>> algorithmIterator, Maze2D maze, Session socket, int delay) {
            this.algorithmIterator = algorithmIterator;
            this.maze = maze;
            this.timer = new Timer(delay, this);
            this.socket = socket;
        }

        @Override
        public void actionPerformed(ActionEvent e) {
            if (!algorithmIterator.hasNext()) {
                return;
            }
            Node<?, Point, ?> currentNode = algorithmIterator.next();
            // Record all visited states to mark as visited in the string
            explored.add(currentNode.state());
            List<Point> statePath = Lists.transform(currentNode.path(), new Function<Node<?, Point, ?>, Point>() {
                @Override
                public Point apply(Node<?, Point, ?> pointNode) {
                    return pointNode.state();
                }
            });

            updateMaze(getMazeStringSolution(maze, explored, statePath));
                
            if (currentNode.state().equals(maze.getGoalLoc())) {
                stopTimer();
            }
        }

        public void startTimer() {
            timer.start();
        }

        public void stopTimer() {
            timer.stop();
        }
    }

    private String getMazeStringSolution(Maze2D maze, Collection<Point> explored, Collection<Point> path) {
        List<Map<Point, Character>> replacements = new ArrayList<Map<Point, Character>>();
        Map<Point, Character> replacement = new HashMap<Point, Character>();
        for (Point p : explored) {
            replacement.put(p, '.');
        }
        replacements.add(replacement);
        replacement = new HashMap<Point, Character>();
        for (Point p : path) {
            replacement.put(p, '*');
        }
        replacements.add(replacement);
        return maze.getReplacedMazeString(replacements);
    }

    private Iterator<? extends Node<?, Point, ?>> createAlgorithm(Maze2D maze, int algorithm) {

        final Iterator<? extends Node<?, Point, ?>> iterator;

        switch (algorithm) {

            case 0:
                iterator = Hipster.createBreadthFirstSearch(buildProblem(maze, false)).iterator();
                break;
            case 1:
                iterator = Hipster.createBellmanFord(buildProblem(maze, false)).iterator();
                break;
            case 2:
                iterator = Hipster.createDijkstra(buildProblem(maze, false)).iterator();
                break;
            case 3:
                iterator = Hipster.createAStar(buildProblem(maze, true)).iterator();
                break;
            case 4:
                iterator = Hipster.createIDAStar(buildProblem(maze, true)).iterator();
                break;
            default:
                throw new IllegalStateException("Invalid algorithm");
        }
        return iterator;
    }

    private SearchProblem<Void, Point, WeightedNode<Void, Point, Double>> buildProblem(final Maze2D maze, final boolean heuristic) {
        return ProblemBuilder.create()
                .initialState(maze.getInitialLoc())
                .defineProblemWithoutActions()
                .useTransitionFunction(new StateTransitionFunction<Point>() {
            @Override
            public Iterable<Point> successorsOf(Point state) {
                return maze.validLocationsFrom(state);
            }
        })
                .useCostFunction(new CostFunction<Void, Point, Double>() {
            @Override
            public Double evaluate(Transition<Void, Point> transition) {
                Point source = transition.getFromState();
                Point destination = transition.getState();
                double distance = source.distance(destination);
                double roundedDistance = (double) Math.round(distance * 1e5) / 1e5;
                return roundedDistance;
            }
        })
                .useHeuristicFunction(new HeuristicFunction<Point, Double>() {
            @Override
            public Double estimate(Point state) {
                if (heuristic) {
                    double distance = state.distance(maze.getGoalLoc());
                    double roundedDistance = (double) Math.round(distance * 1e5) / 1e5;
                    return roundedDistance;
                }
                return 0d;
            }
        }).build();
    }
}
