package com.dynamobi.sqlmed.pdi;

import java.sql.SQLException;
import java.util.Collections;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.namespace.FarragoMedMetadataQuery;
import net.sf.farrago.namespace.FarragoMedNameDirectory;
import net.sf.farrago.namespace.impl.MedAbstractColumnSet;
import net.sf.farrago.namespace.impl.MedAbstractNameDirectory;
import net.sf.farrago.trace.FarragoTrace;
import net.sf.farrago.type.FarragoTypeFactory;

public class PDIMedNameDirectory extends MedAbstractNameDirectory {

	public PDIMedDataServer server;
	public String scope;
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedNameDirectory.class);
    
	public PDIMedNameDirectory() {
		super();
        logger.log(Level.SEVERE, "################ in Constructor PDIMedNameDirectory()");
		// TODO Auto-generated constructor stub
	}
	
	public PDIMedNameDirectory(PDIMedDataServer pdiMedDataServer, String scope) {
	    logger.log(Level.SEVERE, "################ pdiMedDataServer = " + pdiMedDataServer + " scope " + scope);
        this.server = pdiMedDataServer;
        this.scope = scope;
	    logger.log(Level.SEVERE, "################ Done --- Constructor PDIMedNameDirectory(...,...)");
        // TODO Auto-generated method stub		
	}

	public MedAbstractColumnSet lookupColumnSet(FarragoTypeFactory typeFactory, 
			String foreignName, String[] localName) throws SQLException {
	    logger.log(Level.SEVERE, "################ in Constructor PDIMedNameDirectory.lookupColumnSet(...,...)");   
        if (!scope.equals(FarragoMedMetadataQuery.OTN_TABLE)) {
            return null;
        }
        
        return server.newColumnSet(localName, server.getProperties(), typeFactory, null, Collections.EMPTY_MAP);
        
        // TODO Auto-generated method stub
		//return null;

	}
	
    // implement FarragoMedNameDirectory
    public FarragoMedNameDirectory lookupSubdirectory(String foreignName)
        throws SQLException
    {
        logger.log(Level.SEVERE, "################ in method PDIMedNameDirectory.lookupSubdirectory(.....)");
        if (scope.equals(FarragoMedMetadataQuery.OTN_SCHEMA)) {
        	PDIKtrFileParams.SchemaType schemaType = PDIKtrFileParams.getSchemaType(foreignName, false);
            if (schemaType != null) {
                return new PDIMedNameDirectory( server, FarragoMedMetadataQuery.OTN_TABLE);
            } else {
                return null;
            }
        }
        return null;
    }

}
