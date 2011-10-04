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

package com.dynamobi.pentaho.whlabel.client;

import com.google.gwt.user.client.rpc.AsyncCallback;

public interface WHLabelServiceAsync {
	void getDataSources(AsyncCallback<String[]> callback);
	void setDWLabel(String dsName, String labelName,
			AsyncCallback<Integer> callback);
	void getDWLabels(String dsName, AsyncCallback<String[]> callback);
	void getDWLabels(AsyncCallback<String[]> callback);
	void getDWLabel(String dsName, AsyncCallback<String> callback);

}
