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
package com.dynamobi.luciddb;

import org.pentaho.di.ui.spoon.*;
import org.pentaho.ui.xul.XulDomContainer;
import org.pentaho.ui.xul.XulException;

import com.dynamobi.luciddb.LucidDbPluginPerspective;
import com.dynamobi.luciddb.LucidDbLauncher;
import com.dynamobi.luciddb.LucidDbJetty;

import java.io.File;
import java.util.Properties;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;

import org.pentaho.di.core.logging.LogChannel;
import org.pentaho.di.core.logging.LogChannelInterface;

@SpoonPlugin(id = "LucidDb", image = "plugins/spoon/lucidDb/lucid_db_logo_PMS_2010-32.png")
@SpoonPluginCategories({"spoon", "trans-graph"})
public class LucidDbPlugin implements SpoonPluginInterface {
  
  private LogChannelInterface
    log = new LogChannel(LucidDbPlugin.class.toString());

  public LucidDbPlugin() {    
  }

  public SpoonLifecycleListener getLifecycleListener() {
    return new SpoonLifecycleListener() {
      public void onEvent(SpoonLifeCycleEvent evt) {
        if (evt == SpoonLifeCycleEvent.STARTUP) {
          InputStream in = null;
          try {
            in = new FileInputStream(
                "plugins/spoon/lucidDb/plugin_config.properties");
          } catch (FileNotFoundException ex) {
            ex.printStackTrace();
          }
          Properties pro = new Properties();
          try {
            if (in != null) {
              pro.load(in);
            }
          } catch (IOException e) {
            e.printStackTrace();
          }
          boolean launch = true;
          boolean launch_jetty = true;
          if (in != null && pro != null) {
            launch = new Boolean(pro.getProperty(
                  "Luciddb.start.db.on.plugin.startup")).booleanValue();
            launch_jetty = new Boolean(pro.getProperty(
                  "Luciddb.start.admin.on.plugin.startup")).booleanValue();
          }

          if (launch && !LucidDbLauncher.launched) {
            String dir;
            try {
              // should be kettle/
              dir = new File(".").getCanonicalPath() +
                "/plugins/spoon/lucidDb";
            } catch (Exception ex) {
              log.logError("Could not open current directory", ex);
              return;
            }
            LucidDbLauncher.start(dir);
          }
          if (launch_jetty && !LucidDbJetty.launched) {
            LucidDbJetty.start();
          }
        } else if (evt == SpoonLifeCycleEvent.SHUTDOWN) {
          if (LucidDbJetty.launched) {
            LucidDbJetty.stop();
          }
          System.out.println("ORAR");
          if (LucidDbLauncher.launched) {
            System.out.println("RAR");
            LucidDbLauncher.stop();
          }
        }
      }
    };
  }
  
  public SpoonPerspective getPerspective() {
    return LucidDbPluginPerspective.getSingleton();
  }

  public void applyToContainer(String category, XulDomContainer container)
      throws XulException {
    container.registerClassLoader(getClass().getClassLoader());
  }
}

