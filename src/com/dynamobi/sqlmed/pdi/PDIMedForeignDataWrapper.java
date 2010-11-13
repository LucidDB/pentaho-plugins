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
        
	}
	
	public String getDescription(Locale locale) {
        return "Foreign data wrapper for PDI data";
	}


	public String getSuggestedName() {
        return "PDI_DATA_WRAPPER";
	}
	
	public DriverPropertyInfo[] getServerPropertyInfo(Locale locale,
			Properties wrapperProps, Properties serverProps) {
		
		MedPropertyInfoMap infoMap = new MedPropertyInfoMap(FarragoResource.instance(), "PDIMed", serverProps);
		infoMap.addPropInfo(PDIKtrFileParams.PROP_DIRECTORY, true);
		infoMap.addPropInfo(PDIKtrFileParams.PROP_KTR_FILE,true);
		infoMap.addPropInfo(PDIKtrFileParams.PROP_FILE_EXTENSION,true,new String[]{PDIKtrFileParams.DEFAULT_FILE_EXTENSION});
		
		return infoMap.toArray();
	}

	public void initialize(
	        FarragoRepos repos,
	        Properties props)throws SQLException {
		super.initialize(repos, props);
	}
	
	public PDIMedDataServer newServer(String serverMofId, Properties props) {
             
        PDIMedDataServer server = new PDIMedDataServer(this,serverMofId, props);
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
	}	
	
}
