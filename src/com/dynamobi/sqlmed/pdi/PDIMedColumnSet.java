package com.dynamobi.sqlmed.pdi;

import java.util.Map;
import java.util.Properties;

import org.eigenbase.rel.RelNode;
import org.eigenbase.relopt.RelOptCluster;
import org.eigenbase.relopt.RelOptConnection;
import org.eigenbase.reltype.RelDataType;

import net.sf.farrago.namespace.impl.MedAbstractColumnSet;

public class PDIMedColumnSet extends MedAbstractColumnSet {

	private PDIMedDataServer pdiServer;
	
	
	public PDIMedColumnSet(String[] localName, String[] foreignName,
			RelDataType rowType, Properties tableProps,
			Map<String, Properties> columnPropMap) {
		super(localName, foreignName, rowType, tableProps, columnPropMap);
		// TODO Auto-generated constructor stub
	}


	public RelNode toRel(RelOptCluster arg0, RelOptConnection arg1) {
		// TODO Auto-generated method stub
		return null;
	}
	


}
