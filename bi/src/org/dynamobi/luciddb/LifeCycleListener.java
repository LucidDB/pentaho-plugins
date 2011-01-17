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

import org.pentaho.platform.api.engine.IPluginLifecycleListener;

import java.io.File;
public class LifeCycleListener implements IPluginLifecycleListener {

  public void init() { }

  public void loaded() {
    if (!LucidDbLauncher.launched) {
      String dir;
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
      LucidDbLauncher.start(dir);
    }
  }

  public void unLoaded() {
    if (LucidDbLauncher.launched) {
      LucidDbLauncher.stop();
    }
  }

}

