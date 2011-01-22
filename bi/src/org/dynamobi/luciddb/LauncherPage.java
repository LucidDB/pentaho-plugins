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
import org.dynamobi.luciddb.LauncherService;

import java.util.Map;
import java.util.Properties;
import java.io.IOException;
import java.io.OutputStream;

import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;
import org.pentaho.platform.util.messages.LocaleHelper;
import org.pentaho.platform.api.engine.IParameterProvider;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LauncherPage extends SimpleContentGenerator {

  private static Map<String, IParameterProvider> prov;

  public void setParameterProviders(Map<String, IParameterProvider> providers) {
    super.setParameterProviders(providers);
    prov = providers;
  }

  public void createContent(OutputStream out) throws Exception {
    Object action = prov.get("request").getParameter("action");
    if (action != null && action.toString().equals("read_console")) {
      out.write(new
          LauncherService().read().getBytes(LocaleHelper.getSystemEncoding()));
      return;
    }
    Properties pro = new LauncherService().getProperties();
    String url;
    if (pro != null) {
      url = pro.getProperty("Luciddb.adminui.URL");
    } else {
      url = "/adminui/SQLAdmin.html";
    }

    String html = "<html>" +
      "<iframe src=\"" + url + "\" width=\"100%\" height=\"95%\">" +
      "  <p>Turn on iframe support to view this.</p>" +
      "</iframe>" +
      "</html>";
    out.write(html.getBytes(LocaleHelper.getSystemEncoding()));
  }

  public String getMimeType() {
    return "text/html";
  }

  public Log getLogger() {
    return LogFactory.getLog(LauncherPage.class);
  }

}

