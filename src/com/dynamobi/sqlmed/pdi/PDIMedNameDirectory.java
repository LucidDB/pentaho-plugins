package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.sql.SQLException;
import java.util.Collections;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.eigenbase.reltype.RelDataType;
import org.eigenbase.sql.type.SqlTypeName;
import org.pentaho.di.core.row.RowMeta;

import net.sf.farrago.namespace.FarragoMedMetadataQuery;
import net.sf.farrago.namespace.FarragoMedMetadataSink;
import net.sf.farrago.namespace.FarragoMedNameDirectory;
import net.sf.farrago.namespace.impl.MedAbstractColumnSet;
import net.sf.farrago.namespace.impl.MedAbstractNameDirectory;
import net.sf.farrago.trace.FarragoTrace;
import net.sf.farrago.type.FarragoTypeFactory;

public class PDIMedNameDirectory extends MedAbstractNameDirectory {

	public PDIMedDataServer server;
	public String scope;
	PDIHelper pdiHelper = new PDIHelper();
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
    
    
    public boolean queryMetadata(
            FarragoMedMetadataQuery query,
            FarragoMedMetadataSink sink)
            throws SQLException {
    	
    	if (scope.equals(FarragoMedMetadataQuery.OTN_SCHEMA)) {
            boolean wantSchemas =
                query.getResultObjectTypes().contains(
                    FarragoMedMetadataQuery.OTN_SCHEMA);
            if (wantSchemas) {
                sink.writeObjectDescriptor(
                    PDIKtrFileParams.SchemaType.QUERY.getSchemaName(),
                    FarragoMedMetadataQuery.OTN_SCHEMA,
                    null,
                    new Properties());
            }
        } else {
            boolean wantTables =
                query.getResultObjectTypes().contains(
                    FarragoMedMetadataQuery.OTN_TABLE);
            if (wantTables) {
                if (!queryTables(query, sink)) {
                    return false;
                }
            }
            boolean wantColumns =
                query.getResultObjectTypes().contains(
                    FarragoMedMetadataQuery.OTN_COLUMN);
            if (wantColumns) {
                if (!queryColumns(query, sink)) {
                    return false;
                }
            }
        }
    	
    	return true;
    }
    
    private boolean queryTables(
            FarragoMedMetadataQuery query,
            FarragoMedMetadataSink sink)
            throws SQLException {
    	//Map<String, String[]> stepMap = pdiHelper.getSteps(new File("d:/test/testtrans.ktr"));
    	String folder = server.getProperties().getProperty(PDIKtrFileParams.PROP_DIRECTORY);
    	File pdiFolder = new File(folder);
    	String files[] = pdiFolder.list();
    	//asuming there is atleast one .ktr file in the folder, later it will be extended to all files
    	Map<String, String[]> stepMap = pdiHelper.getSteps(new File(folder + "/" + files[0]));
    	Iterator<String> keys = stepMap.keySet().iterator();
    	while(keys.hasNext()) {
    		String steps[] = stepMap.get(keys.next());
        	for(int i=0; i<steps.length; i++) {
        		sink.writeObjectDescriptor(steps[i], FarragoMedMetadataQuery.OTN_TABLE, 
        				null, new Properties());
        	}
    	}    	
    	return true;
    }

    private boolean queryColumns(
            FarragoMedMetadataQuery query,
            FarragoMedMetadataSink sink)
            throws SQLException {
    	String [] localName = {server.getProperties().getProperty("NAME"),
    			PDIKtrFileParams.SchemaType.QUERY.getSchemaName()};
    	
    			
    	RowMeta rowMeta = pdiHelper.getRowMeta("GenerateRows");
    	String[] colNames = rowMeta.getFieldNames();
    	
    	for(int i=0; i<colNames.length; i++) {
    		logger.log(Level.SEVERE, "################ Step-Columns: " + colNames[i]);
    	}
    	
    	RelDataType[] types = new RelDataType[5];
    	FarragoTypeFactory typeFactory = sink.getTypeFactory();
    	types[0] = typeFactory.createTypeWithNullability(typeFactory.createSqlType(
    							SqlTypeName.VARCHAR), true);
       	types[1] = typeFactory.createTypeWithNullability(typeFactory.createSqlType(
				SqlTypeName.VARCHAR), true);
    	types[2] = typeFactory.createTypeWithNullability(typeFactory.createSqlType(
				SqlTypeName.VARCHAR), true);
    	types[3] = typeFactory.createTypeWithNullability(typeFactory.createSqlType(
				SqlTypeName.VARCHAR), true);
    	types[4] = typeFactory.createTypeWithNullability(typeFactory.createSqlType(
				SqlTypeName.VARCHAR), true);
    	for(int i=0; i<types.length; i++) {
    		sink.writeColumnDescriptor("GenerateRows", colNames[i], i, types[i],
    				null, null, new Properties());
    	}
    	return true;
    }
}
