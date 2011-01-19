/*
Dynamo Pentaho Plugins is a project for combining Dynamo projects with Pentaho.
Copyright (C) 2011 Dynamo Business Intelligence Corporation

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation; either version 2 of the License, or (at your option)
any later version approved by Dynamo Business Intelligence Corporation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/
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

import org.dynamobi.luciddb.LucidDbLauncher;

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
    } catch (Exception ex) {
      log.logError("WebServer.Error.FailedToStart.Title", ex);
    } finally {
      launched = true;
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
