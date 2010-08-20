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

package com.dynamobi.pentaho.whlabel.server;


import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.pentaho.commons.connection.IPentahoResultSet;
import org.pentaho.platform.api.engine.ILogger;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.repository.datasource.IDatasource;
import org.pentaho.platform.api.repository.datasource.IDatasourceMgmtService;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.plugin.services.connections.sql.SQLConnection;
import org.pentaho.platform.util.logging.Logger;

import com.dynamobi.pentaho.whlabel.client.WHLabelService;
import com.dynamobi.pentaho.whlabel.connection.WHLabelDataSourceService;
import com.google.gwt.user.server.rpc.RemoteServiceServlet;

public class WHLabelServiceImpl extends RemoteServiceServlet implements WHLabelService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * This method was initially used for testing. Its not used anymore
	 */
	public String[] getDWLables() {
		String driverName = "com.mysql.jdbc.Driver";
		String location = "jdbc:mysql://localhost:3306/hibernate";
		String userName = "hibuser";
		String password = "password";
		ILogger logger = null;
		String query = "Select * from AUTHORITIES";
		String[] retArray= null;
		SQLConnection connection = null;
		IPentahoResultSet resultSet = null;
		try {
			connection = new SQLConnection(driverName, location, userName, password, logger);
			resultSet = connection.executeQuery(query);
		} catch(Exception e) {
			System.out.println("Exception while getting connection ......." + e);
		}
		if (resultSet != null) {
			int rowCount = resultSet.getRowCount();
			retArray = new String[rowCount];
			for (int i = 0; i < rowCount; i++) {
				Object[] rowObj = resultSet.getDataRow(i);
				String tmpString = (String)rowObj[0]; 
			    Logger.error(getClass().toString(), "Return Value  "+ i + " "+ tmpString);
			    retArray[i] = tmpString;
			}
		}
		return retArray;
	}

	public String[] getDataSources() {
		String[] retArray = null;
		List<IDatasource> dataSourcesList = getAllDataSources();
		if (dataSourcesList != null) {
			List <String> dsNameList = new ArrayList<String>();  
			for (IDatasource datasource : dataSourcesList) {
				if (datasource.getUrl().indexOf("luciddb") > 0) {
					dsNameList.add(datasource.getName());
				}
			}
			if (dsNameList.size() > 0) {
				retArray = new String[dsNameList.size()]; 
				for (int i = 0; i < retArray.length; i++) {
					retArray[i] = (String)dsNameList.get(i);;
					Logger.error(getClass().toString(), "DataSourceNames Return Value  dsName "+ i + " "+ retArray[i]);
				}
			}
		}
		return retArray;
	}

	private List<IDatasource> getAllDataSources() {
		List<IDatasource> dataSourcesList = null;
		try {
			IDatasourceMgmtService datasourceMgmtSvc = (IDatasourceMgmtService) PentahoSystem.getObjectFactory().get(IDatasourceMgmtService.class,null);
			dataSourcesList = datasourceMgmtSvc.getDatasources();
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error while getting All DataSources..." + e);
		}
		return dataSourcesList;
	}

	public String[] getDWLables(String dsName) {
		ResultSet rs = null;
		List<String> retList = new ArrayList<String>();
		try {
			WHLabelDataSourceService pooledDSs = new WHLabelDataSourceService();
			//Logger.error(getClass().toString(), ""+ pooledDSs.getClass().getName());
			DataSource dataSource = pooledDSs.getDataSource(dsName);
			Connection con = dataSource.getConnection();
			Statement stmt = con.createStatement();
			rs = stmt.executeQuery("SELECT LABEL_NAME, CREATION_TIMESTAMP FROM SYS_ROOT.DBA_LABELS");
			while (rs.next()) {
				String str = rs.getString("LABEL_NAME") + "~" + rs.getTimestamp("CREATION_TIMESTAMP");
				retList.add(str);
			}
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error while getting DataWarehouse Labels..." + e);
		}
		int size = retList.size();
		String[] retStr = new String[size];
		for (int i = 0; i < size; i++) {
			retStr[i] = (String)retList.get(i);
			//Logger.error(getClass().toString(), "getDWLables Return Value  dsName "+ i + " "+ retStr[i]);
		}
		return retStr;
	}
	
	public int setDWLabel(String dsName, String labelName) {
		int result = -1;
		try {
			IPentahoSession session = PentahoSessionHolder.getSession();
			//Logger.error(getClass().toString(), "setDWLabel --> Session is --->"+ session );
			session.setAttribute(WHLabelDataSourceService.LABEL_SESSION_KEY, labelName);
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error while Setting DataWarehouse Labels... "+ labelName + " ----- "+e);
		}
		return result;
	}
	
	public String getDWLabel() {
		String testSessionValue = null;
		try {
			IPentahoSession session = PentahoSessionHolder.getSession();
			testSessionValue = (String)session.getAttribute(WHLabelDataSourceService.LABEL_SESSION_KEY);
			Logger.error(getClass().toString(), "getDWLabel --> value from the session is --->"+ testSessionValue);
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error in getDWLabel while getting DataWarehouse Labels... "+e);
		}
		return testSessionValue;
	}

}