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
    private String[] foreignName = null;
    
	public PDIMedColumnSet(PDIMedNameDirectory dir, 
			String[] localName, 
			String[] foreignName,
			RelDataType rowType, 
			Properties tableProps,
			Map<String, Properties> columnPropMap) {
		super(localName, foreignName, rowType, tableProps, columnPropMap);
		this.foreignName = foreignName;
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
	    RelOptTable realTable = getPreparingStmt().getTableForMember(foreignName);
	    for (int i = 0; i < foreignName.length; i++)
	    	logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + foreignName " + foreignName[i]);
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + realTable " + realTable);
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + connection " + connection);
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + trailSets " + trailSets);
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + cluster " + cluster);
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.toRel() + this " + this);
        rel = new PDIMedQueryRel(this, cluster, trailSets, realTable, connection);
        return rel;
	}
	    

	public String getFilePath() {
	    logger.log(Level.SEVERE, "################ in method PDIMedColumnSet.getFilePath()");
		// TODO Auto-generated method stub
		return null;
	}

}
