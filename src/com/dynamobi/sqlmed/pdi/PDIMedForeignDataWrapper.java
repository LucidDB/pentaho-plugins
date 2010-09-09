package com.dynamobi.sqlmed.pdi;

import java.sql.DatabaseMetaData;
import java.sql.Driver;
import java.sql.DriverPropertyInfo;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.ResourceBundle;


import net.sf.farrago.namespace.FarragoMedDataServer;
import net.sf.farrago.namespace.impl.MedAbstractDataWrapper;
import net.sf.farrago.namespace.impl.MedPropertyInfoMap;
import net.sf.farrago.resource.FarragoResource;

public class PDIMedForeignDataWrapper extends MedAbstractDataWrapper {

    public static final String PROP_DRIVER_CLASS_NAME = "DRIVER_CLASS";
	
    
	public PDIMedForeignDataWrapper() {
		super();
		// TODO Auto-generated constructor stub
	}

	public PDIMedDataServer newServer(String serverMofId, Properties props) {
		
		String driverClassName = props.getProperty(PROP_DRIVER_CLASS_NAME);
		if (driverClassName != null) {
            loadDriverClass(driverClassName);
        }
        Properties chainedProps = new Properties(getProperties());
        chainedProps.putAll(props);
        PDIMedDataServer server = new PDIMedDataServer(serverMofId, chainedProps);
        boolean success = false;
        try {
            server.initialize();
            success = true;
            return server;
        } catch(Exception e) {

        } finally {
            if (!success) {
                server.closeAllocation();
            }
        }
        return null;
		// TODO Auto-generated method stub
		//return null;
	}

	public String getDescription(Locale locale) {
        return "Foreign data wrapper for PDI data";
		// TODO Auto-generated method stub
		//return null;
	}


	public String getSuggestedName() {
        return "PDI_DATA_WRAPPER";
		// TODO Auto-generated method stub
		//return null;
	}
	
	public DriverPropertyInfo[] getServerPropertyInfo(Locale locale,
			Properties wrapperProps, Properties serverProps) {
        DriverPropertyInfo [] driverArray = null;
        String url = serverProps.getProperty(PDIMedDataServer.PROP_URL);
        boolean extOpts = getBooleanProperty(serverProps, PDIMedDataServer.PROP_EXT_OPTIONS, false);
        if ((url != null) && extOpts) {
            Properties driverProps = new Properties();
            driverProps.putAll(serverProps);
            PDIMedDataServer.removeNonDriverProps(driverProps);
            try {
                final String className = serverProps.getProperty(PROP_DRIVER_CLASS_NAME, wrapperProps.getProperty(PROP_DRIVER_CLASS_NAME));
                Driver driver = loadDriverClass(className);
                driverArray = driver.getPropertyInfo(url, driverProps);
            } catch (Throwable ex) {
                // Squelch it and move on.
            }
        }
        // serverProps takes precedence over wrapperProps
        Properties chainedProps = new Properties(wrapperProps);
        chainedProps.putAll(serverProps);
        ResourceBundle resourceBundle = FarragoResource.instance();
        MedPropertyInfoMap infoMap = new MedPropertyInfoMap(resourceBundle, "MedJdbc", chainedProps);
        infoMap.addPropInfo(PDIMedDataServer.PROP_DRIVER_CLASS, true);
        infoMap.addPropInfo(PDIMedDataServer.PROP_URL, true);
        infoMap.addPropInfo(PDIMedDataServer.PROP_USER_NAME);
        infoMap.addPropInfo(PDIMedDataServer.PROP_PASSWORD);
        infoMap.addPropInfo(PDIMedDataServer.PROP_EXT_OPTIONS, true, BOOLEAN_CHOICES_DEFAULT_FALSE);

        if (url != null) {
            FarragoMedDataServer server = null;
            try {
                server = newServer("faux-mofid", chainedProps);
                if (server instanceof PDIMedDataServer) {
                	PDIMedDataServer PDIMedDs = (PDIMedDataServer) server;
                    String term = PDIMedDs.getDatabaseMetaData().getSchemaTerm();
                    if (PDIMedDs.useSchemaNameAsForeignQualifier
                        || (term == null) || (term.length() == 0)) {
                        // add optional SCHEMA_NAME property
                        String [] list = null;
                        if (PDIMedDs.supportsMetaData) {
                            // collect names for list of choices
                            list = getArtificialSchemas(PDIMedDs.getDatabaseMetaData());
                        }
                        infoMap.addPropInfo(PDIMedDataServer.PROP_SCHEMA_NAME, false, list);
                    }
                }
            } catch (Exception e) {
                // swallow and ignore
                //Util.swallow(e, null);
            } finally {
                if (server != null) {
                    server.releaseResources();
                    server.closeAllocation();
                }
            }
        }

        
        DriverPropertyInfo [] mapArray = infoMap.toArray();
        if (driverArray == null) {
            return mapArray;
        } else {
            DriverPropertyInfo [] result =
                new DriverPropertyInfo[mapArray.length + driverArray.length];
            System.arraycopy(mapArray, 0, result, 0, mapArray.length);
            System.arraycopy(driverArray, 0, result, mapArray.length, driverArray.length);
            return result;
        }
        
		// TODO Auto-generated method stub
		//return super.getServerPropertyInfo(locale, wrapperProps, serverProps);
	}
	
    private String[] getArtificialSchemas(PDIMetaData databaseMetaData) {
		// TODO Auto-generated method stub
		return null;
	}

	private Driver loadDriverClass(String driverClassName) {
        try {
            Class<?> clazz = Class.forName(driverClassName);
            return (Driver) clazz.newInstance();
        } catch (Exception ex) {
        	// TODO resolve FarragoResource issue
            //throw FarragoResource.instance().JdbcDriverLoadFailed.ex(driverClassName, ex);
        }
        return null;
    }
    
    // gets database names for use as SCHEMA_NAME values
    private String [] getArtificialSchemas(DatabaseMetaData meta) throws SQLException {
        // REVIEW hersker 2005-05-31:
        // Testing with MySQL 5.0 shows that DatabaseMetaData.getSchemas()
        // returns an empty ResultSet, but DatabaseMetadata.getCatalogs()
        // returns database names that can be used as schema qualifiers.
        // Other tested DBs (Oracle 10.2g, SQL Server 2005, PostgreSQL 8.0)
        // do not need artificial schema names.
        List<String> list = new ArrayList<String>();
        ResultSet rs = meta.getCatalogs();
        try {
            while (rs.next()) {
                String name = rs.getString(1);
                list.add(name);
            }
        } finally {
            if (rs != null) {
                rs.close();
            }
        }

        if (list.size() == 0) {
            return null;
        }

        String [] schemas = new String[list.size()];
        list.toArray(schemas);
        Arrays.sort(schemas);
        return schemas;
    }
	
}
