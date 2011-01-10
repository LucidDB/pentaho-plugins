/**
 * parts (c) pentaho 2010
 */
package org.dynamobi.luciddb;

import org.pentaho.di.ui.spoon.*;
import org.pentaho.ui.xul.XulDomContainer;
import org.pentaho.ui.xul.XulException;

import org.dynamobi.luciddb.LucidDbPluginPerspective;

@SpoonPlugin(id = "LucidDb", image = "")
@SpoonPluginCategories({"spoon", "trans-graph"})
public class LucidDbPlugin implements SpoonPluginInterface {
  
  public LucidDbPlugin() {    
  }

  public SpoonLifecycleListener getLifecycleListener() {
    return new SpoonLifecycleListener() {
      public void onEvent(SpoonLifeCycleEvent evt) {
        if (evt == SpoonLifeCycleEvent.STARTUP) {
          System.out.println("STARTING");
        } else if (evt == SpoonLifeCycleEvent.SHUTDOWN) {
          System.out.println("SHUT DOWN");
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

