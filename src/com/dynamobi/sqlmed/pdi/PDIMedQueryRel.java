package com.dynamobi.sqlmed.pdi;

import org.eigenbase.rel.RelFieldCollation;
import org.eigenbase.rel.TableAccessRelBase;
import org.eigenbase.relopt.RelOptCluster;
import org.eigenbase.relopt.RelOptConnection;
import org.eigenbase.relopt.RelOptTable;
import org.eigenbase.relopt.RelTraitSet;

import net.sf.farrago.fem.fennel.FemExecutionStreamDef;
import net.sf.farrago.query.FennelRel;
import net.sf.farrago.query.FennelRelImplementor;

public class PDIMedQueryRel extends TableAccessRelBase implements FennelRel {

	
	public PDIMedQueryRel(RelOptCluster cluster, RelTraitSet traits,
			RelOptTable table, RelOptConnection connection) {
		super(cluster, traits, table, connection);
		// TODO Auto-generated constructor stub
	}

	public RelFieldCollation[] getCollations() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object implementFennelChild(FennelRelImplementor arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	public FemExecutionStreamDef toStreamDef(FennelRelImplementor arg0) {
		// TODO Auto-generated method stub
		return null;
	}


	

}
