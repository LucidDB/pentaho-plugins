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
import org.dynamobi.luciddb.LifeCycleListener;
import org.dynamobi.luciddb.LucidDbLauncher;

import java.util.Properties;
import java.util.List;
import java.util.ArrayList;
import java.io.InputStream;
import java.io.IOException;

import org.pentaho.platform.api.engine.IPluginResourceLoader;
import org.pentaho.platform.engine.core.system.PentahoSystem;

public class LauncherService {

  private static List<String> read_messages = new ArrayList<String>();

  public Properties getProperties() {
    IPluginResourceLoader res_loader = PentahoSystem.get(
        IPluginResourceLoader.class, null);
    InputStream in = res_loader.getResourceAsStream(LauncherService.class,
        "resources/plugin_config.properties");
    Properties pro = new Properties();
    try {
      pro.load(in);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
    return pro;
  }

  public String start() {
    new LifeCycleListener().loaded(false);
    return "Service started.";
  }

  public String stop() {
    new LifeCycleListener().unLoaded();
    return "Service stopped.";
  }

  public String read() {
    if (LucidDbLauncher.launched) {
      String line;
      while ((line = LucidDbLauncher.read()) != null) {
        read_messages.add(line);
      }
      StringBuilder sb = new StringBuilder();
      for (String s : read_messages) {
        sb.append(s);
        sb.append("\n<br />");
      }
      return sb.toString();
    }
    return "LucidDB has not been started.";
  }

}
