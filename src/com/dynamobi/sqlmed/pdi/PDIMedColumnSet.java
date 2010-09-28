package com.dynamobi.sqlmed.pdi;

import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.namespace.impl.MedAbstractColumnSet;
import net.sf.farrago.trace.FarragoTrace;

import org.eigenbase.rel.RelNode;
import org.eigenbase.relopt.RelOptCluster;
import org.eigenbase.relopt.RelOptConnection;
import org.eigenbase.relopt.RelOptTable;
import org.eigenbase.relopt.RelTraitSet;
import org.eigenbase.reltype.RelDataType;

public class PDIMedColumnSet extends MedAbstractColumnSet {

	private RelOptTable table;
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedDataServer.class);
    
    
	public PDIMedColumnSet(PDIMedNameDirectory dir, 
			String[] localName, 
			String foreignName,
			RelDataType rowType, 
			Properties tableProps,
			Map<String, Properties> columnPropMap) {
		super(localName, null, rowType, tableProps, columnPropMap);
        logger.log(Level.SEVERE, "################ in Constructor PDIMedColumnSet(....)");
	}
	
	 public double getRowCount() {
	     logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.getRowCount()");
		 return super.getRowCount();
	 }


	public RelNode toRel(RelOptCluster cluster, RelOptConnection connection) {
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel()");
        RelNode rel = null;
        
        RelTraitSet trailSets = null;
        rel = new PDIMedQueryRel(this, cluster, trailSets, table, connection);
        return rel;
	}
	    

	public String getFilePath() {
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.getFilePath()");
		// TODO Auto-generated method stub
		return null;
	}

}
