package com.dynamobi.sqlmed.pdi;

import java.sql.SQLException;
import java.util.Map;
import java.util.Properties;

import net.sf.farrago.namespace.impl.MedAbstractColumnSet;
import net.sf.farrago.namespace.impl.MedAbstractNameDirectory;
import net.sf.farrago.type.FarragoTypeFactory;

import org.eigenbase.reltype.RelDataType;

public class PDIMedNameDirectory extends MedAbstractNameDirectory {

	public PDIMedDataServer server;
	public String schemaName;
	
	public PDIMedNameDirectory() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public PDIMedNameDirectory(PDIMedDataServer pdiMedDataServer, String schemaName) {
        this.server = server;
        this.schemaName = schemaName;
        // TODO Auto-generated method stub		
	}

	public MedAbstractColumnSet lookupColumnSet(FarragoTypeFactory typeFactory, 
			String foreignName, String[] localName) throws SQLException {
    
		RelDataType rowType = null; // TODO -- get this rowType from somewhere
		Map<String, Properties> columnPropMap = null;  // TODO -- get this columnPropMap from somewhere
		Properties  tableProps = null;  // TODO -- get this tablePropMap from somewhere
		return server.newColumnSet(localName, tableProps, typeFactory, rowType, columnPropMap); 
        
        // TODO Auto-generated method stub
		//return null;

	}


}
