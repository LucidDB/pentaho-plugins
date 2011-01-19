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

import org.dynamobi.luciddb.LucidDbLauncher;
import org.dynamobi.luciddb.LauncherService;

import org.pentaho.platform.api.engine.IPluginLifecycleListener;
import org.pentaho.platform.api.engine.IPluginResourceLoader;
import org.pentaho.platform.engine.core.system.PentahoSystem;

import java.io.File;
import java.util.List;
import java.util.Properties;
import java.net.URL;

public class LifeCycleListener implements IPluginLifecycleListener {

  public void init() { }

  public void loaded() {
    loaded(true);
  }

  public void loaded(boolean check_config) {
    if (check_config) {
      Properties pro = new LauncherService().getProperties();
      if (pro != null) {
        boolean launch = new Boolean(pro.getProperty(
              "Luciddb.start.db.on.plugin.startup")).booleanValue();
        if (!launch)
          return;
      }
    }

    if (!LucidDbLauncher.launched) {
      String dir;
      IPluginResourceLoader res_loader = PentahoSystem.get(
          IPluginResourceLoader.class, null);
      List<URL> res_files = res_loader.findResources(
          LifeCycleListener.class, "resources/*");
      if (res_files.size() > 0) {
        // chopped off filename
        dir = res_files.get(0).getPath();
        dir = dir.substring(0, dir.lastIndexOf('/'));
      } else {
        // try using 'known' path
        try {
          dir = new File(".").getCanonicalPath();
        } catch (Exception e) {
          e.printStackTrace();
          return;
        }
        // dir should be biserver/tomcat/bin
        dir += "/../../pentaho-solutions/system/lucidDB/resources";
        if (System.getProperty("os.name").startsWith("Windows")) {
          dir = dir.replaceAll("/", "\\\\");
        }
      }
      LucidDbLauncher.start(dir);
    }
  }

  public void unLoaded() {
    if (LucidDbLauncher.launched) {
      LucidDbLauncher.stop();
    }
  }

}

