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

	private PDIMedDataServer pdiServer;
	private RelOptTable table;
	private PDIMedNameDirectory directory;
	
	public PDIMedColumnSet(PDIMedNameDirectory dir, String[] localName, String foreignName,
			RelDataType rowType, Properties tableProps,
			Map<String, Properties> columnPropMap) {
		super(localName, null, rowType, tableProps, columnPropMap);
		this.directory = dir;
		
	}


	public RelNode toRel(RelOptCluster cluster, RelOptConnection connection) {
        RelNode rel = null;
        try {
            rel = optimizeLoopbackLink(cluster, connection);
        } catch (Exception ex) {
        }

        if (rel != null) {
            return rel;
        }

        RelTraitSet trailSets = null;
        rel = new PDIMedQueryRel(this, cluster, trailSets, table, connection);
        return rel;
	}
	

    private RelNode optimizeLoopbackLink(RelOptCluster cluster, RelOptConnection connection) throws Exception {
        if (directory == null) {
            return null;
        }
        if (directory.server == null) {
            return null;
        }
        if ((directory.server.schemaName != null)
            && !directory.server.useSchemaNameAsForeignQualifier)
        {
            // Schema name should never be specified for a connection to Farrago; if it is, bail.
            return null;
        }
        // Instead, schema name should always be present in foreign name.
        String [] schemaQualifiedName = getForeignName();
        if (schemaQualifiedName.length < 2) {
            return null;
        }
        String catalogName = directory.server.catalogName;
        if (catalogName == null) {
            // No catalog name specified, so try to query the connection for it.
        	PDIIterator iterator =  directory.server.getDatabaseMetaData().getCatalogs();
        	while (iterator.hasNext()) {
        		// TODO there could be many. need to refine
        		catalogName = (String)iterator.next();
        	}
            if (catalogName == null) {
                return null;
            }
        }
        
        // OK, we're ready to construct the local name of the real underlying table.
        String [] actualName = new String[3];
        actualName[0] = catalogName;
        actualName[1] = schemaQualifiedName[schemaQualifiedName.length - 2];
        actualName[2] = schemaQualifiedName[schemaQualifiedName.length - 1];      
        
        RelOptTable realTable = getPreparingStmt().getTableForMember(actualName);
        if (realTable == null) {
            return null;
        }
        return realTable.toRel(cluster, connection);  

    }


	public String getFilePath() {
		// TODO Auto-generated method stub
		return null;
	}

}
