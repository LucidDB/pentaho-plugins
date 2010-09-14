package com.dynamobi.sqlmed.pdi;

import net.sf.farrago.catalog.FarragoRepos;
import net.sf.farrago.fem.fennel.FemExecutionStreamDef;
import net.sf.farrago.fem.fennel.FemFlatFileTupleStreamDef;
import net.sf.farrago.fennel.rel.FennelRelUtil;
import net.sf.farrago.query.FennelRel;
import net.sf.farrago.query.FennelRelImplementor;
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
	
	public PDIMedQueryRel(PDIMedColumnSet columnSet, RelOptCluster cluster, RelTraitSet traits,
			RelOptTable table, RelOptConnection connection) {
		super(cluster, traits, table, connection);
		// TODO Auto-generated constructor stub
		this.columnSet = columnSet;
		this.connection = connection;
		this.cluster = cluster;
	}

	public RelFieldCollation[] getCollations() {
		// TODO Auto-generated method stub
		return null;
	}

	public Object implementFennelChild(FennelRelImplementor fennelRelImpl) {
        return Literal.constantNull();
	}

	public FemExecutionStreamDef toStreamDef(FennelRelImplementor fennelRelImpl) {

        final FarragoRepos repos = FennelRelUtil.getRepos(this);
        FemFlatFileTupleStreamDef streamDef = repos.newFemFlatFileTupleStreamDef();
        streamDef.setDataFilePath(columnSet.getFilePath());
        
		// TODO Auto-generated method stub
		return null;
	}


	

}
