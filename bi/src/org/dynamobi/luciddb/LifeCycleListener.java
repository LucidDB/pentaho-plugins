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

