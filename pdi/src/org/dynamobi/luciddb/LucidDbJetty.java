package org.dynamobi.luciddb;

import org.mortbay.jetty.Connector;
import org.mortbay.jetty.Handler;
import org.mortbay.jetty.Server;
import org.mortbay.jetty.bio.SocketConnector;
import org.mortbay.jetty.handler.DefaultHandler;
import org.mortbay.jetty.handler.HandlerCollection;
import org.mortbay.jetty.webapp.WebAppContext;
import org.pentaho.di.core.logging.LogChannel;
import org.pentaho.di.core.logging.LogChannelInterface;

public class LucidDbJetty {
  
  // pentaho log channel:
  private static LogChannelInterface
    log = new LogChannel(LucidDbJetty.class.toString());

  private static Server server;
  public static String host = "localhost";
  public static int port = 8077;
  private static String webappsFolder = "plugins/spoon/lucidDb/wars";

  public static boolean launched = false;

  public static void start() {
    server = new Server();

    WebAppContext adminui = new WebAppContext();
    adminui.setContextPath("/adminui");
    adminui.setWar(webappsFolder + "/adminui.war");
    adminui.setParentLoaderPriority(true);

    WebAppContext adminws = new WebAppContext();
    adminws.setContextPath("/adminws");
    adminws.setWar(webappsFolder + "/adminws.war");
    adminws.setParentLoaderPriority(true);
    
    HandlerCollection handlers= new HandlerCollection();
    handlers.setHandlers(new Handler[]{adminui, adminws, new DefaultHandler()});
    server.setHandler(handlers);

    SocketConnector connector = new SocketConnector();
    connector.setPort(port);
    connector.setHost(host);
    connector.setName(host);
    log.logBasic("LucidDb.WebServer.Log.Listener on " + host + ":" + port);

    server.setConnectors(new Connector[] { connector });

    try {
      server.start();
      launched = true;
    } catch (Exception ex) {
      log.logError("WebServer.Error.FailedToStart.Title", ex);
    }
  }

  public static void stop() {
    try {
      if (server != null) {
        server.stop();
        launched = false;
      }
    } catch (Exception ex) {
      log.logError("WebServer.Error.FailedToStop.Title", ex);
    }
  }

}
