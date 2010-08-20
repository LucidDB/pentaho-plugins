package com.dynamobi.pentaho.whlabel.connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.sql.DataSource;

import org.pentaho.platform.api.data.DatasourceServiceException;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.api.repository.datasource.IDatasource;
import org.pentaho.platform.api.repository.datasource.IDatasourceMgmtService;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.engine.core.system.PentahoSystem;
import org.pentaho.platform.engine.services.connection.datasource.dbcp.PooledOrJndiDatasourceService;
import org.pentaho.platform.util.logging.Logger;

public class WHLabelDataSourceService extends PooledOrJndiDatasourceService{

	public static final String LABEL_SESSION_KEY = "DWLabel";
	public WHLabelDataSourceService () {
		super();
	}
	
	public DataSource getDataSource(String dsName, String labelName)
			throws DatasourceServiceException {
		DataSource dataSource = null;
		try {
			dataSource = super.getDataSource(dsName);
			if (isDSLucidDB(dsName)) {
				Connection con = dataSource.getConnection();
				Statement stmt = con.createStatement();
				if (labelName == null)
					labelName = "null";
				String query = "ALTER SESSION SET \"label\" = '"+ labelName +"'";
				int result = stmt.executeUpdate(query);
			}
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error while getting DataSources(String, String)... "+ labelName);
		}
		return dataSource;
	}
	
	@Override
	public DataSource getDataSource(String dsName)
			throws DatasourceServiceException {
		DataSource dataSource = null;
	    String labelName = null;
		try {
			dataSource = super.getDataSource(dsName);
			Logger.error(getClass().toString(), "In method WHLabelDataSourceService:getDataSource(String) 1 "+ dataSource);
			if (isDSLucidDB(dsName)) {
			    IPentahoSession session = PentahoSessionHolder.getSession();
				Logger.error(getClass().toString(), "In method WHLabelDataSourceService:getDataSource(String) 2 "+ dataSource);
			    labelName = (String)session.getAttribute(LABEL_SESSION_KEY);
				Logger.error(getClass().toString(), "In method WHLabelDataSourceService:getDataSource(String) 3 "+ dataSource);
				Connection con = dataSource.getConnection();
				Statement stmt = con.createStatement();
				String query = null;
				if (labelName == null)
					query = "ALTER SESSION SET \"label\" = NULL";
				else
					query = "ALTER SESSION SET \"label\" = '"+ labelName +"'";
				Logger.error(getClass().toString(), "In method WHLabelDataSourceService:getDataSource(String) 4 -- Query  "+ query);
				int result = stmt.executeUpdate(query);
				stmt.close();
				con.close();
				Logger.error(getClass().toString(), "In method WHLabelDataSourceService:getDataSource(String) 4 "+ labelName + " result " + result);
				testLabelInDB(dataSource);
			}
		} catch (Exception e) {
			Logger.error(getClass().toString(), "Error while getting DataSource:getDataSource(String) 5 "+ e);
		}
		return dataSource;
	}

	private void testLabelInDB(DataSource ds) {
		// TODO Auto-generated method stub
		try {
			Connection con = ds.getConnection();
			Statement stmt = con.createStatement();
			String query = "SELECT * FROM SYS_ROOT.USER_SESSION_PARAMETERS WHERE PARAM_NAME = 'label'";
			ResultSet rs = stmt.executeQuery(query);
			String currentLabelName = null;
			while (rs.next())
				currentLabelName = rs.getString("PARAM_VALUE");
			Logger.error(getClass().toString(), "In method WHLabelDataSourceService:testLabelInDB(DataSource) 1 -- checking current label in DB -- Query  "+ query + " PARAM_VALUE " + currentLabelName);
		}catch(Exception e) {
			Logger.error(getClass().toString(), "Error while checking current label in DB --> testLabelInDB(DataSource) "+ e);
		}
	}

	public boolean isDSLucidDB(String dsName) {
		boolean retValue = false;
		IDatasource iDS = null;
		try {
			IDatasourceMgmtService datasourceMgmtSvc = (IDatasourceMgmtService) PentahoSystem.getObjectFactory().get(IDatasourceMgmtService.class,null);
			iDS = datasourceMgmtSvc.getDatasource(dsName);
			Logger.error(getClass().toString(), "In method WHLabelDataSourceService:isDSLucidDB(String) 1 ");
			Logger.error(getClass().toString(), "------- Lucid DB Connection Details -------");
			Logger.error(getClass().toString(), "------- Driver Class -------> " + iDS.getDriverClass());
			Logger.error(getClass().toString(), "------- User Name -------> " + iDS.getUserName());
			Logger.error(getClass().toString(), "------- Password -------> " + iDS.getPassword());
			Logger.error(getClass().toString(), "------- Url -------> " + iDS.getUrl());
			Logger.error(getClass().toString(), "------- Class -------> " + iDS.getClass());
			if (iDS != null && (iDS.getUrl().indexOf("luciddb") > 0)) {
				retValue = true;
			}
		} catch (Exception e) {
			Logger.error(getClass().toString(), "In method WHLabelDataSourceService:isDSLucidDB(String) 2 "+ e);
		}
		Logger.error(getClass().toString(), "In method WHLabelDataSourceService:isDSLucidDB(String) 3 -- done ");
		return retValue;
	}
}
