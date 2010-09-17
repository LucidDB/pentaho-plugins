package com.dynamobi.sqlmed.pdi;

import java.util.Map;
import java.util.Properties;

import net.sf.farrago.namespace.impl.MedAbstractColumnSet;

import org.eigenbase.rel.RelNode;
import org.eigenbase.relopt.RelOptCluster;
import org.eigenbase.relopt.RelOptConnection;
import org.eigenbase.relopt.RelOptTable;
import org.eigenbase.relopt.RelTraitSet;
import org.eigenbase.reltype.RelDataType;

public class PDIMedColumnSet extends MedAbstractColumnSet {

	private RelOptTable table;
	
	public PDIMedColumnSet(PDIMedNameDirectory dir, 
			String[] localName, 
			String foreignName,
			RelDataType rowType, 
			Properties tableProps,
			Map<String, Properties> columnPropMap) {
		super(localName, null, rowType, tableProps, columnPropMap);
		
	}
	
	 public double getRowCount() {
		 return super.getRowCount();
	 }


	public RelNode toRel(RelOptCluster cluster, RelOptConnection connection) {
        RelNode rel = null;
        
        RelTraitSet trailSets = null;
        rel = new PDIMedQueryRel(this, cluster, trailSets, table, connection);
        return rel;
	}
	    

	public String getFilePath() {
		// TODO Auto-generated method stub
		return null;
	}

}
