package org.dynamobi.luciddb;
import org.dynamobi.luciddb.LifeCycleListener;

public class LauncherService {

  public String start() {
    new LifeCycleListener().loaded();
    return "Service started.";
  }

  public String stop() {
    new LifeCycleListener().unLoaded();
    return "Service stopped.";
  }

}
