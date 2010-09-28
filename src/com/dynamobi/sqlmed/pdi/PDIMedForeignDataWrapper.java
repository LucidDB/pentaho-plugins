package com.dynamobi.sqlmed.pdi;

import java.sql.DriverPropertyInfo;
import java.sql.SQLException;
import java.util.Locale;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;


import net.sf.farrago.catalog.FarragoRepos;
import net.sf.farrago.namespace.impl.MedAbstractDataWrapper;
import net.sf.farrago.namespace.impl.MedPropertyInfoMap;
import net.sf.farrago.resource.FarragoResource;
import net.sf.farrago.trace.FarragoTrace;

public class PDIMedForeignDataWrapper extends MedAbstractDataWrapper {
    
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedDataServer.class);
    
	public PDIMedForeignDataWrapper() {
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper()");
		
	}
	
	public String getDescription(Locale locale) {
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper.getDescription()");
        return "Foreign data wrapper for PDI data";
	}


	public String getSuggestedName() {
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper.getSuggestedName()");
        return "PDI_DATA_WRAPPER";
	}

	public void initialize(
	        FarragoRepos repos,
	        Properties props)throws SQLException {
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper.initialize()");
		super.initialize(repos, props);
	}
	
	public PDIMedDataServer newServer(String serverMofId, Properties props) {
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper.newServer()");

        Properties chainedProps = new Properties(getProperties());
        chainedProps.putAll(props);
        PDIMedDataServer server = new PDIMedDataServer(this,serverMofId, chainedProps);
        boolean success = false;
        try {
            server.initialize();
            success = true;
            return server;
        } catch(Exception e) {

        } finally {
            if (!success) {
                //server.closeAllocation();
            }
        }
        return null;
	}
	
	public DriverPropertyInfo[] getServerPropertyInfo(Locale locale,
			Properties wrapperProps, Properties serverProps) {
		
        logger.log(Level.SEVERE, "################ in method PDIMedForeignDataWrapper.getServerPropertyInfo()");
		MedPropertyInfoMap infoMap = new MedPropertyInfoMap(FarragoResource.instance(), "PDIMed", serverProps);
		infoMap.addPropInfo(PDIMedDataServer.PROP_PDI_URL, true);
		infoMap.addPropInfo(PDIMedDataServer.PROP_STEP_TYPE, true, new String[] { PDIMedDataServer.DEFAULT_STYPE_TYPE } );
		
		return infoMap.toArray();
	}
	
	
}
