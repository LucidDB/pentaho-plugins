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
    return null;
  }
  
  /**
   * Provides an optional SpoonPerspective.
   * 
   * @return optional SpoonPerspective
   */
  public SpoonPerspective getPerspective() {
    return LucidDbPluginPerspective.getSingleton();
  }

  @Override
  public void applyToContainer(String category, XulDomContainer container)
      throws XulException {

    container.registerClassLoader(getClass().getClassLoader());
    if (category.equals("trans-graph")){
      container.loadOverlay("org/pentaho/pdi/spoon/trans_overlay.xul");
      //container.addEventHandler(VisHelper.getInstance());
    }
  }
}

