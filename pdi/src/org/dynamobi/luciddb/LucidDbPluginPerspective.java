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

import java.io.InputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.util.*;

import org.eclipse.swt.SWT;
import org.eclipse.swt.custom.CTabFolder;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.pentaho.di.core.EngineMetaInterface;
import org.pentaho.di.ui.spoon.SpoonPerspective;
import org.pentaho.di.ui.spoon.SpoonPerspectiveListener;
import org.pentaho.ui.xul.XulOverlay;
import org.pentaho.ui.xul.impl.XulEventHandler;

import org.eclipse.swt.layout.*;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Shell;

import org.pentaho.di.core.Props;
import org.pentaho.di.ui.core.PropsUI;
import org.pentaho.di.ui.spoon.SpoonBrowser;
import org.pentaho.di.ui.core.gui.GUIResource;
import org.pentaho.di.core.logging.LogChannel;
import org.pentaho.di.core.logging.LogChannelInterface;
import java.net.MalformedURLException;
import java.net.URL;

import org.pentaho.xul.swt.tab.TabItem;
import org.pentaho.xul.swt.tab.TabSet;

import org.dynamobi.luciddb.LucidDbLauncher;
import org.dynamobi.luciddb.LucidDbJetty;

public class LucidDbPluginPerspective implements SpoonPerspective {
  
  private static LogChannelInterface
    log = new LogChannel(LucidDbPluginPerspective.class.toString());

  protected static LucidDbPluginPerspective singleton = null;
  protected Composite UI;

  private boolean activated = false;
  private static TabSet tabfolder;

  public LucidDbPluginPerspective() {
    if (singleton == null) {
      Shell shell = new Shell();
      shell.setLayout(new GridLayout(10, true));
      shell.setSize(900, 600);

      Composite holder = new Composite(shell, SWT.NONE);
      holder.setLayout(new GridLayout(10, true));

      Button start_browser_button = new Button(holder, SWT.PUSH);
      start_browser_button.setText("Launch Admin Tab");
      GridData grid = new GridData();
      grid.horizontalSpan = 2;
      grid.verticalAlignment = GridData.FILL;
      start_browser_button.setLayoutData(grid);

      Button start_button = new Button(holder, SWT.PUSH);
      start_button.setText("Start LucidDB");
      grid = new GridData();
      grid.horizontalSpan = 2;
      grid.verticalAlignment = GridData.FILL;
      start_button.setLayoutData(grid);

      Button stop_button = new Button(holder, SWT.PUSH);
      stop_button.setText("Stop LucidDB");
      grid = new GridData();
      grid.horizontalSpan = 2;
      grid.verticalAlignment = GridData.FILL;
      stop_button.setLayoutData(grid);

      Button start_admin_button = new Button(holder, SWT.PUSH);
      start_admin_button.setText("Start Admin Server");
      grid = new GridData();
      grid.horizontalSpan = 2;
      grid.verticalAlignment = GridData.FILL;
      start_admin_button.setLayoutData(grid);

      Button stop_admin_button = new Button(holder, SWT.PUSH);
      stop_admin_button.setText("Stop Admin Server");
      grid = new GridData();
      grid.horizontalSpan = 2;
      grid.verticalAlignment = GridData.FILL;
      stop_admin_button.setLayoutData(grid);
      
      // listeners      
      start_browser_button.addSelectionListener(new SelectionAdapter() {
        public void widgetSelected(SelectionEvent e) {
          startBrowser();
        }
      });

      start_button.addSelectionListener(new SelectionAdapter() {
        public void widgetSelected(SelectionEvent e) {
          if (!LucidDbLauncher.launched) {
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
        }
      });

      stop_button.addSelectionListener(new SelectionAdapter() {
        public void widgetSelected(SelectionEvent e) {
          if (LucidDbLauncher.launched) {
            LucidDbLauncher.stop();
          }
        }
      });

      start_admin_button.addSelectionListener(new SelectionAdapter() {
        public void widgetSelected(SelectionEvent e) {
          if (!LucidDbJetty.launched) {
            LucidDbJetty.start();
          }
        }
      });

      stop_admin_button.addSelectionListener(new SelectionAdapter() {
        public void widgetSelected(SelectionEvent e) {
          if (LucidDbJetty.launched) {
            LucidDbJetty.stop();
          }
        }
      });

      tabfolder = new TabSet(holder);
      tabfolder.setChangedFont(GUIResource.getInstance().getFontBold());
      tabfolder.setUnchangedFont(GUIResource.getInstance().getFontGraph());

      PropsUI props = PropsUI.getInstance();
      props.setLook(tabfolder.getSwtTabset(), Props.WIDGET_STYLE_TAB);

      grid = new GridData();
      grid.horizontalSpan = 10;
      grid.horizontalAlignment = GridData.FILL;
      grid.verticalAlignment = GridData.FILL;
      grid.grabExcessHorizontalSpace = true;
      grid.grabExcessVerticalSpace = true;
      tabfolder.getSwtTabset().setLayoutData(grid);

      // layout for the holder panel
      grid = new GridData();
      grid.horizontalAlignment = GridData.FILL;
      grid.verticalAlignment = GridData.FILL;
      grid.grabExcessHorizontalSpace = true;
      grid.grabExcessVerticalSpace = true;
      holder.setLayoutData(grid);
      holder.layout();
      
      UI = holder;
      singleton = this;
    }
  }
  
  public static void startBrowser() {
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
    String default_url = "/adminui/SQLAdmin.html";
    if (in != null && pro != null) {
      default_url = pro.getProperty("Luciddb.adminui.URL");
    }
    String u;
    if (default_url.equals("/adminui/SQLAdmin.html")) {
      u = "http://" + LucidDbJetty.host + ":" + LucidDbJetty.port + default_url;
    } else {
      u = default_url;
    }
    URL url;
    try {
      url = new URL(u);
    } catch (MalformedURLException ex) {
      log.logError("Bad URL: " + u, ex);
      return;
    }

    String name = "Admin UI";

    try {
      CTabFolder cTabFolder = tabfolder.getSwtTabset();
      SpoonBrowser browser = new SpoonBrowser(cTabFolder, null,
          u, true, true, null);
      TabItem tabItem = new TabItem(tabfolder, name, name);
      tabItem.setImage(GUIResource.getInstance().getImageLogoSmall());
      tabItem.setControl(browser.getComposite());
      tabfolder.setSelected(0);
    } catch (Exception ex) {
      log.logError("Unable to open browser tab.", ex);
    }
  }

  public static LucidDbPluginPerspective getSingleton() {
    if (singleton == null) {
      new LucidDbPluginPerspective();
    }
    return singleton;
  }

  public void addPerspectiveListener(SpoonPerspectiveListener listener) { }

  public void setActive(boolean active) {
    // this function is not trustworthy;
    // it will set true for first activation,
    // when switching perspectives it will alternate
    // false-true-false. When just closing without changing,
    // this method isn't even called.

    if (!activated) {
      startBrowser();
      activated = true;
    }
  }

  public EngineMetaInterface getActiveMeta() {
    return null;
  }

  public String getId() {
    return "lucidDbAdmin";
  }

  public String getDisplayName(Locale arg) {
    return "LucidDB Admin UI";
  }

  public List<XulEventHandler> getEventHandlers() {
    return null;
  }

  public List<XulOverlay> getOverlays() {
    return null;
  }

  public InputStream getPerspectiveIcon() {
    ClassLoader loader = getClass().getClassLoader();
    return loader.getResourceAsStream("plugins/spoon/lucidDb/lucid_db_logo_PMS_2010-32.png");
  }

  public Composite getUI() {            
    return UI;
  }

}
