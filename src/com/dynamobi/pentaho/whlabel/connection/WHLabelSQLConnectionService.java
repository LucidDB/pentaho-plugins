package com.dynamobi.pentaho.whlabel.connection;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Properties;

import org.pentaho.commons.connection.IPentahoConnection;
import org.pentaho.platform.api.engine.ILogger;
import org.pentaho.platform.api.engine.IPentahoSession;
import org.pentaho.platform.engine.core.system.PentahoSessionHolder;
import org.pentaho.platform.plugin.services.connections.sql.SQLConnection;
import org.pentaho.platform.util.logging.Logger;

/**
 * This class is a part of the WHLabel plugin. It extends the SQLConnection class of the BI-platform. 
 * Overrides the constructor and also the setProperties method of the SQLConnection class. 
 * The setProperties method is called just before the the initWithMethod of the SQLConnection is called.
 * the setProperties method of this classes calls the super method first to make sure the initWithJNDI 
 * method operations are performed and then it picks up the value of the label stored in the 
 * Pentaho user session and sets the current value of the session to the label in the LucidDB database 
 * The label is set for every connection that is returned to the connection seeker 
 *   
 * @author Prasanna
 *
 */
public class WHLabelSQLConnectionService extends SQLConnection {

	public static final String LABEL_SESSION_KEY = "DWLabel";

	/**
	 * Constructor override
	 */
	public WHLabelSQLConnectionService() {
		super();
		Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:WHLabelSQLConnectionService() 1 ");
	}
	
	/**
	 * Constructor override
	 */
	public WHLabelSQLConnectionService(final String driverName, final String location, final String userName, final String password,
			final ILogger logger) {
		super();
		init(driverName, location, userName, password);
		Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:WHLabelSQLConnectionService(String, String, String, String) 1 ");
	}

	/**
	 * setProperties override. calls the super method and then picks up the current value stored 
	 * in the session and then calls the setLabelProperties method
	 */
	@Override
	public void setProperties(Properties props) {
		super.setProperties(props);
		String labelName = "NULL";
		Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setProperties() 1 ");
	    IPentahoSession session = PentahoSessionHolder.getSession();
	    Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setProperties() 2 ");
		String dsName = props.getProperty(IPentahoConnection.JNDI_NAME_KEY);
	    labelName = (String)session.getAttribute(dsName + "~"+LABEL_SESSION_KEY);
	    Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setProperties() 3 --> labelName -- " + labelName);
		if (labelName == null)
			labelName = "NULL";
		props.put("label", labelName);
		setLabelProperties(labelName);
	}

	/**
	 * accepts the labelName as an argument and sets the labelName as the current set label for the 
	 * current connection
	 * @param labelName
	 */
	private void setLabelProperties(String labelName) {
	    try {
	    	Statement stmt = nativeConnection.createStatement();
			String query = null;
			if (labelName == null)
				query = "ALTER SESSION SET \"label\" = NULL";
			else if (labelName.equalsIgnoreCase("null")) {
				query = "ALTER SESSION SET \"label\" = NULL";
			} else {
				query = "ALTER SESSION SET \"label\" = '"+ labelName +"'";
			}
			Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setLabelProperties(String) 1 -- Query  " + query);
			stmt.execute(query);
			Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setLabelProperties(String) 2 "+ labelName);
	    } catch (Exception e){
	    	Logger.debug(getClass().toString(), "In method WHLabelSQLConnectionService:setLabelProperties(String) 3 --> labelName -- " + labelName);
	    }
	    
	}
	
}
