package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.lang.reflect.Proxy;
import java.sql.SQLException;
import java.util.Iterator;
import java.util.Map;
import java.util.Properties;
import java.util.StringTokenizer;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.namespace.FarragoMedMetadataQuery;
import net.sf.farrago.namespace.FarragoMedNameDirectory;
import net.sf.farrago.namespace.impl.MedAbstractColumnSet;
import net.sf.farrago.namespace.impl.MedAbstractDataServer;
import net.sf.farrago.namespace.impl.MedAbstractDataWrapper;
import net.sf.farrago.resource.FarragoResource;
import net.sf.farrago.trace.FarragoTrace;
import net.sf.farrago.type.FarragoTypeFactory;

import org.eigenbase.relopt.RelOptPlanner;
import org.eigenbase.reltype.RelDataType;
import org.eigenbase.sql.SqlUtil;

public class PDIMedDataServer extends MedAbstractDataServer {

	public static final String PROP_PDI_URL = "PDI_URL";
    public static final String PROP_STEP_TYPE = "STEP_TYPE";
    public static final String PROP_TRANS_ARGS = "TRANS_ARGS";
    public static final String DEFAULT_STYPE_TYPE = "ALL";
    public static final String PROP_SCHEMA_NAME = "FOREIGN_SCHEMA_NAME";
    public static final String PROP_TABLE_NAME = "FOREIGN_TABLE_NAME";
    public static final String PROP_ROW_COUNT = "ROW_COUNT";
    public static final String PROP_SCHEMA_MAPPING = "SCHEMA_MAPPING";
    public static final String PROP_TABLE_MAPPING = "TABLE_MAPPING";
    public static final String PROP_TABLE_PREFIX_MAPPING = "TABLE_PREFIX_MAPPING";
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedDataServer.class);
    
    private PDIMetaData databaseMetaData;
    public Properties props;

  
    
    // JNDI DataSource name
    protected String jndiName;
    
    private MedAbstractDataWrapper wrapper;
    PDIKtrFileParams params;
    private String pdiUrl=null;
    private String[] transArgs=null;

 
	protected PDIMedDataServer(MedAbstractDataWrapper wrapper, 
			String serverMofId, 
			Properties props) {
		super(serverMofId, props);
		this.wrapper = wrapper;
        Iterator iterator = props.keySet().iterator();
        logger.log(Level.SEVERE, "################ in Constructor PDIMedDataServer(String, Properties)");
        while (iterator.hasNext()) {
        	logger.log(Level.SEVERE, "################ Iterator value " + iterator.next());
        }
	}


	public void initialize() throws SQLException {
        params = new PDIKtrFileParams(getProperties());
        params.decode();
        props = getProperties();
        logger.log(Level.SEVERE, "################ in method PDIMedDataServer.initialize()");
        pdiUrl = props.getProperty(PROP_PDI_URL);
        String transArgProp = props.getProperty(PROP_TRANS_ARGS);
        
        logger.log(Level.SEVERE, "################ pdiUrl = " + pdiUrl);
        logger.log(Level.SEVERE, "################ transArgProp = " + transArgProp);
        if(pdiUrl!=null) {
	        File transFile = new File(pdiUrl);
	        
	        if(!transFile.exists() && !pdiUrl.equals("")) {
	        	throw FarragoResource.instance().FileNotFound.ex(pdiUrl);
	        } 
        }
       
        if(transArgProp!=null) {
        	if(!transArgProp.contains(",")){
        		transArgs = new String[1];
        		transArgs[0] = transArgProp;
        	}else {
        		StringTokenizer tokens = new StringTokenizer(transArgProp,",");
            	transArgs = new String[tokens.countTokens()];
            	int idx=0;
            	while(tokens.hasMoreTokens()){
            		transArgs[idx]=tokens.nextToken();
            		idx++;
            	}            		
        	}
        	
        }
        
        String schemaMapping = props.getProperty(PROP_SCHEMA_MAPPING);
        String tableMapping = props.getProperty(PROP_TABLE_MAPPING);

        String tablePrefixMapping = props.getProperty(PROP_TABLE_PREFIX_MAPPING);
        try {
            if (((schemaMapping != null) && (tableMapping != null))
                || ((schemaMapping != null) && (tablePrefixMapping != null))
                || ((tableMapping != null) && (tablePrefixMapping != null)))
            {
                throw FarragoResource.instance()
                .MedJdbc_InvalidTableSchemaMapping.ex();
            }

            if (schemaMapping != null) {
                parseMapping(databaseMetaData, schemaMapping, false, false);
            } else if (tableMapping != null) {
                parseMapping(databaseMetaData, tableMapping, true, false);
            } else if (tablePrefixMapping != null) {
                parseMapping(databaseMetaData, tablePrefixMapping, true, true);
            }
        } catch (RuntimeException e) {
            logger.log(Level.SEVERE, "Error initializing MedJdbc mappings", e);
            closeAllocation();
            throw e;
        }
            

	}
	
	
	@Override
	public FarragoMedNameDirectory getNameDirectory() throws SQLException {
        logger.log(Level.SEVERE, "################ in method PDIMedDataServer.getNameDirectory()");
        return new PDIMedNameDirectory(this, FarragoMedMetadataQuery.OTN_SCHEMA);
	}

	
	public MedAbstractColumnSet newColumnSet(String[] localName, 
			Properties tableProps, 
			FarragoTypeFactory typeFactory, 
			RelDataType rowType, 
			Map<String, Properties> columnPropMap) throws SQLException {
        logger.log(Level.SEVERE, "################ in method PDIMedDataServer.newColumnSet()");
		PDIMedNameDirectory directory = (PDIMedNameDirectory)getNameDirectory();
        logger.log(Level.SEVERE, "################ in method PDIMedDataServer.newColumnSet() -----> Done with getNameDirectory");
		PDIUtility pdi = new PDIUtility(pdiUrl,transArgs);
        String[] foreignName = new String[] { null, getForeignSchemaName(), getForeignTableName() };
        return new PDIMedColumnSet(directory, localName, foreignName, rowType, tableProps, columnPropMap);
	}
	
	
    private void parseMapping(PDIMetaData databaseMetaData, String mapping,
            boolean isTableMapping, boolean isTablePrefixMapping) {
        logger.log(Level.SEVERE, "################ in method PDIMedDataServer.parseMapping()");
    	if (!isTableMapping) {
            // Force valid parameters.
            isTablePrefixMapping = false;
        }

        String srcSchema = null;
        String srcTable = null;
        String targetSchema = null;
        String targetTable = null;

        StringBuffer buffer = new StringBuffer(64);
        buffer.setLength(0);

        boolean insideQuotes = false;
        boolean atSource = true;

        int len = mapping.length();
        int i = 0;

        while (i < len) {
            char c = mapping.charAt(i);
            switch (c) {
            case '"':
                if (!isQuoteChar(mapping, i)) {
                    // escape character, add one quote
                    buffer.append(c);
                    i++;
                } else {
                    if (insideQuotes) {
                        // this is the endQuote
                        insideQuotes = false;
                    } else {
                        // this is the startQuote
                        insideQuotes = true;
                    }
                }
                i++;
                break;
                
            case '.':
                if (!isTableMapping) {
                    // non special characters
                    buffer.append(c);
                } else {
                    // in table mapping, "." is a special character
                    if (insideQuotes) {
                        buffer.append(c);
                    } else {
                        if (atSource) {
                            srcSchema = buffer.toString();
                            srcSchema = srcSchema.trim();
                        } else {
                            targetSchema = buffer.toString();
                            targetSchema = targetSchema.trim();
                        }
                        buffer.setLength(0);
                    }
                }
                i++;
                break;
                
            case ':':
                if (insideQuotes) {
                    buffer.append(c);
                } else {
                    srcTable = buffer.toString();
                    srcTable = srcTable.trim();
                    atSource = false;
                    buffer.setLength(0);
                }
                i++;
                break;
                
            case ';':
                if (insideQuotes) {
                    buffer.append(c);
                } else {
                    targetTable = buffer.toString();
                    targetTable = targetTable.trim();
                    atSource = true;
                    buffer.setLength(0);
                    if (isTableMapping) {
                        if (isTablePrefixMapping) {
                            createTablePrefixMaps(srcSchema, srcTable, targetSchema, targetTable);
                        } else {
                            createTableMaps(srcSchema, srcTable, targetSchema, targetTable);
                        }
                    } else {
                        createSchemaMaps(databaseMetaData, srcTable, targetTable);
                    }
                }
                i++;
                break;
                
            default:
                // non special characters
                buffer.append(c);
                i++;
                break;
            }
            if (i == len) {
                targetTable = buffer.toString();
                targetTable = targetTable.trim();
                buffer.setLength(0);
                if (isTableMapping) {
                    if (isTablePrefixMapping) {
                        createTablePrefixMaps(srcSchema, srcTable, targetSchema, targetTable);
                    } else {
                        createTableMaps(srcSchema, srcTable, targetSchema, targetTable);
                    }
                } else {
                    createSchemaMaps(databaseMetaData, srcTable, targetTable);
                }
            }
        }
    }


    private void createSchemaMaps(PDIMetaData databaseMetaData, String key, String value) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.createSchemaMaps()");
        if ((key == null) || (value == null)) {
            return;
        }

        
    }

    private void createTableMaps(String srcSchema, String srcTable, String targetSchema,
            String targetTable) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.createTableMaps()");
    	if ((srcSchema == null) || (srcTable == null) || (targetSchema == null) || (targetTable == null)) {
            return;
        }

        
    }

    
    private void createTablePrefixMaps(String srcSchema, String srcTablePrefix, String targetSchema,
    	String targetTablePrefix) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.createTablePrefixMaps()");
        if ((srcSchema == null) || (srcTablePrefix == null) || (targetSchema == null) || (targetTablePrefix == null)) {
            return;
        }

        if (srcTablePrefix.endsWith("%")) {
            srcTablePrefix = srcTablePrefix.substring(0, srcTablePrefix.length() - 1);
        }

        if (targetTablePrefix.endsWith("%")) {
            targetTablePrefix = targetTablePrefix.substring(0, targetTablePrefix.length() - 1);
        }

      
    }

//    private void initializeDataSource() {
//    	 
//    }	

	

	@Override
	public void registerRules(RelOptPlanner planner) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.registerRules()");
        super.registerRules(planner);
		
	}

	@Override
	public void closeAllocation() {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.closeAllocation()");
		super.closeAllocation();
	}

	public static void removeNonDriverProps(Properties props) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.removeNonDriverProps()");
	}


	



	public PDIMetaData getDatabaseMetaData() {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.getDatabaseMetaData()");
		String url = (String)props.get("URL"); // TODO Where should the URL come from?

		if (databaseMetaData == null)
			initMetaData(url);
        return databaseMetaData;
	}

    private boolean isQuoteChar(String mapping, int index) {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.isQuoteChar()");
    	boolean isQuote = false;

        for (int i = index; i < mapping.length(); i++) {
            if (mapping.charAt(i) == '"') {
                isQuote = !isQuote;
            } else {
                break;
            }
        }
        return isQuote;
    }
        
    private void initMetaData(String url)
    {
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.initMetaData()");
        try {
            databaseMetaData = getMetaData(url);
        } catch (Exception ex) {
            //Util.swallow(ex, logger);
        }

        if (databaseMetaData == null) {
            // driver can't even support getMetaData(); treat it as brain-damaged
            databaseMetaData = (PDIMetaData) Proxy.newProxyInstance(null, new Class[] { PDIMetaData.class }, 
            		new SqlUtil.DatabaseMetaDataInvocationHandler("UNKNOWN", ""));
        }
    }
    

	

    
    //~ Inner Classes ----------------------------------------------------------

    public static class Source
    {
        final String schema;
        final String table;

        Source(String sch, String tab)
        {
            this.schema = sch;
            this.table = tab;
        }

        public String getSchema()
        {
            return this.schema;
        }

        public String getTable()
        {
            return this.table;
        }
    }

    public static class WildcardMapping
    {
        final String targetTablePrefix;
        final String sourceSchema;
        final String sourceTablePrefix;

        WildcardMapping(
            String targetTablePrefix,
            String sourceSchema,
            String sourceTablePrefix)
        {
            this.targetTablePrefix = targetTablePrefix;
            this.sourceSchema = sourceSchema;
            this.sourceTablePrefix = sourceTablePrefix;
        }

        public String getTargetTablePrefix()
        {
            return targetTablePrefix;
        }

        public String getSourceSchema()
        {
            return sourceSchema;
        }

        public String getSourceTablePrefix()
        {
            return sourceTablePrefix;
        }

        public boolean equals(Object o)
        {
            WildcardMapping that = (WildcardMapping) o;

            return this.targetTablePrefix.equals(that.targetTablePrefix)
                && this.sourceSchema.equals(that.sourceSchema)
                && this.sourceTablePrefix.equals(that.sourceTablePrefix);
        }
    }

    private PDIMetaData getMetaData(String url) {
//    	String url = ""; urlString should be supplied
        logger.log(Level.SEVERE, "################ in method FlatFileDataServer.getNameDirectory()");
    	PDIMetaData metaData = new PDIMetaData(url);
    	return metaData;

	}


    String getForeignSchemaName()
    {
        return getProperties().getProperty(PROP_SCHEMA_NAME);
    }

    String getForeignTableName()
    {
        return getProperties().getProperty(PROP_TABLE_NAME);
    }


}
