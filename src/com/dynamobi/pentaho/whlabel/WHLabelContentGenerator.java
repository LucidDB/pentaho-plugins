/*
 * This program is free software; you can redistribute it and/or modify it under the 
 * terms of the GNU Lesser General Public License, version 2.1 as published by the Free Software 
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this 
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html 
 * or from the Free Software Foundation, Inc., 
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * Copyright 2009 Pentaho Corporation.  All rights reserved.
 *
 * Created May 20, 2009
 * @author Aaron Phillips
 */

package com.dynamobi.pentaho.whlabel;

import java.io.OutputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.pentaho.platform.api.engine.IPluginResourceLoader;
import org.pentaho.platform.engine.services.solution.SimpleContentGenerator;
import org.pentaho.platform.plugin.services.pluginmgr.PluginResourceLoader;
import org.pentaho.platform.util.messages.LocaleHelper;

/**
 * This is contentGenerator class for loading the HTML file in the WHLabel Plugin resources
 * @author Prasanna
 */
public class WHLabelContentGenerator extends SimpleContentGenerator{

	@Override
	public void createContent(OutputStream out) throws Exception {
		try {
			IPluginResourceLoader ipluginresourceloader = new PluginResourceLoader();
			String s = ipluginresourceloader.getResourceAsString(WHLabelContentGenerator.class, "resources/whLabel.html");
			out.write(s.getBytes(LocaleHelper.getSystemEncoding()));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public String getMimeType() {
		return "text/html";
	}

	@Override
	public Log getLogger() {
		return LogFactory.getLog(WHLabelContentGenerator.class);
	}

}
