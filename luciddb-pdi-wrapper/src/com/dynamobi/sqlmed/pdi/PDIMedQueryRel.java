package com.dynamobi.sqlmed.pdi;

import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.catalog.FarragoRepos;
import net.sf.farrago.fem.fennel.FemExecutionStreamDef;
import net.sf.farrago.fem.fennel.FemFlatFileTupleStreamDef;
import net.sf.farrago.fennel.rel.FennelRelUtil;
import net.sf.farrago.query.FennelRel;
import net.sf.farrago.query.FennelRelImplementor;
import net.sf.farrago.trace.FarragoTrace;
import openjava.ptree.Literal;

import org.eigenbase.rel.RelFieldCollation;
import org.eigenbase.rel.TableAccessRelBase;
import org.eigenbase.relopt.RelOptCluster;
import org.eigenbase.relopt.RelOptConnection;
import org.eigenbase.relopt.RelOptTable;
import org.eigenbase.relopt.RelTraitSet;

public class PDIMedQueryRel extends TableAccessRelBase implements FennelRel {


	PDIMedColumnSet columnSet;
	RelOptConnection connection;
	RelOptCluster cluster;
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedQueryRel.class);
    
	public PDIMedQueryRel(PDIMedColumnSet columnSet, RelOptCluster cluster, RelTraitSet traits,
			RelOptTable table, RelOptConnection connection) {
		super(cluster, traits, table, connection);
		// TODO Auto-generated constructor stub
		logger.log(Level.SEVERE, "################ in Constructor PDIMedQueryRel() -->  columnSet" + columnSet);
		logger.log(Level.SEVERE, "################ in Constructor PDIMedQueryRel() --> connection " + connection);
		logger.log(Level.SEVERE, "################ in Constructor PDIMedQueryRel() --> cluster " + cluster);
        this.columnSet = columnSet;
		this.connection = connection;
		this.cluster = cluster;
        logger.log(Level.SEVERE, "################ end Constructor PDIMedQueryRel()");
	}

	public RelFieldCollation[] getCollations() { 
        logger.log(Level.SEVERE, "################ in method PDIMedQueryRel.getCollations()");
		// TODO Auto-generated method stub
		return null;
	}

	public Object implementFennelChild(FennelRelImplementor fennelRelImpl) {
        logger.log(Level.SEVERE, "################ in method PDIMedQueryRel.implementFennelChild()");
        return Literal.constantNull();
	}

	public FemExecutionStreamDef toStreamDef(FennelRelImplementor fennelRelImpl) {
        logger.log(Level.SEVERE, "################ in method PDIMedQueryRel.toStreamDef()");
        final FarragoRepos repos = FennelRelUtil.getRepos(this);
        FemFlatFileTupleStreamDef streamDef = repos.newFemFlatFileTupleStreamDef();
        streamDef.setDataFilePath(columnSet.getFilePath());
        
		// TODO Auto-generated method stub
		return null;
	}


	

}
