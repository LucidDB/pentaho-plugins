/**
 * parts (c) pentaho 2010
 */
package org.dynamobi.luciddb;

import org.pentaho.di.ui.spoon.*;
import org.pentaho.ui.xul.XulDomContainer;
import org.pentaho.ui.xul.XulException;

import org.dynamobi.luciddb.LucidDbPluginPerspective;
import org.dynamobi.luciddb.LucidDbLauncher;
import org.dynamobi.luciddb.LucidDbJetty;
import java.io.File;
import org.pentaho.di.core.logging.LogChannel;
import org.pentaho.di.core.logging.LogChannelInterface;

@SpoonPlugin(id = "LucidDb", image = "")
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
          if (!LucidDbLauncher.launched) {
            String dir;
            try {
              // should be kettle/
              dir = new File(".").getCanonicalPath() +
                "/plugins/spoon/lucidDb/luciddb/bin";
            } catch (Exception ex) {
              log.logError("Could not open current directory", ex);
              return;
            }
            LucidDbLauncher.start(dir);
          }
          if (!LucidDbJetty.launched) {
            LucidDbJetty.start();
          }
        } else if (evt == SpoonLifeCycleEvent.SHUTDOWN) {
          if (LucidDbLauncher.launched) {
            LucidDbLauncher.stop();
          }
          if (LucidDbJetty.launched) {
            LucidDbJetty.stop();
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

