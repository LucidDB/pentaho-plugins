package com.dynamobi.sqlmed.pdi;

import java.lang.reflect.Proxy;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;

import org.eigenbase.enki.util.JndiUtil;
import org.eigenbase.relopt.RelOptPlanner;
import org.eigenbase.reltype.RelDataType;
import org.eigenbase.sql.SqlUtil;
import org.eigenbase.util.Util;

import net.sf.farrago.jdbc.engine.FarragoJdbcEngineConnection;
import net.sf.farrago.namespace.FarragoMedColumnSet;
import net.sf.farrago.namespace.FarragoMedNameDirectory;
import net.sf.farrago.namespace.impl.MedAbstractDataServer;
import net.sf.farrago.resource.FarragoResource;
import net.sf.farrago.session.FarragoSession;
import net.sf.farrago.trace.FarragoTrace;
import net.sf.farrago.type.FarragoTypeFactory;

public class PDIMedDataServer extends MedAbstractDataServer {

    public static final String PROP_URL = "URL";
    public static final String PROP_EXT_OPTIONS = "EXTENDED_OPTIONS";
    public static final String PROP_DRIVER_CLASS = "DRIVER_CLASS";
    public static final String PROP_USER_NAME = "USER_NAME";
    public static final String PROP_PASSWORD = "PASSWORD";
    public static final String PROP_CATALOG_NAME = "QUALIFYING_CATALOG_NAME";
    public static final String PROP_SCHEMA_NAME = "SCHEMA_NAME";
    public static final String PROP_JNDI_NAME = "JNDI_NAME";
    public static final String PROP_LOGIN_TIMEOUT = "LOGIN_TIMEOUT";
    public static final String PROP_VALIDATION_QUERY = "VALIDATION_QUERY";
    public static final String PROP_VALIDATION_TIMING = "VALIDATION_TIMING";
    public static final String PROP_VALIDATION_TIMING_ON_BORROW = "ON_BORROW";
    public static final String PROP_VALIDATION_TIMING_ON_RETURN = "ON_RETURN";
    public static final String PROP_VALIDATION_TIMING_WHILE_IDLE = "WHILE_IDLE";
    public static final String PROP_DISABLE_CONNECTION_POOL = "DISABLE_CONNECTION_POOL";
    public static final String PROP_USE_SCHEMA_NAME_AS_FOREIGN_QUALIFIER = "USE_SCHEMA_NAME_AS_FOREIGN_QUALIFIER";
    public static final String PROP_LENIENT = "LENIENT";
    public static final String PROP_DISABLED_PUSHDOWN_REL_PATTERN = "DISABLED_PUSHDOWN_REL_PATTERN";
    public static final String PROP_TABLE_TYPES = "TABLE_TYPES";
    public static final String PROP_FETCH_SIZE = "FETCH_SIZE";
    public static final String PROP_AUTOCOMMIT = "AUTOCOMMIT";
    public static final String PROP_MAX_IDLE_CONNECTIONS = "MAX_IDLE_CONNECTIONS";
    public static final String PROP_EVICTION_TIMER_PERIOD_MILLIS = "EVICTION_TIMER_PERIOD_MILLIS";
    public static final String PROP_MIN_EVICTION_IDLE_MILLIS = "MIN_EVICTION_IDLE_MILLIS";
    public static final String PROP_SCHEMA_MAPPING = "SCHEMA_MAPPING";
    public static final String PROP_TABLE_MAPPING = "TABLE_MAPPING";
    public static final String PROP_TABLE_PREFIX_MAPPING = "TABLE_PREFIX_MAPPING";
    
    
    public static final boolean DEFAULT_DISABLE_CONNECTION_POOL = false;
    public static final String DEFAULT_VALIDATION_TIMING = PROP_VALIDATION_TIMING_ON_BORROW;
    public static final boolean DEFAULT_USE_SCHEMA_NAME_AS_FOREIGN_QUALIFIER = false;
    public static final boolean DEFAULT_LENIENT = false;
    public static final String DEFAULT_DISABLED_PUSHDOWN_REL_PATTERN = "";
    public static final int DEFAULT_FETCH_SIZE = -1;
    public static final boolean DEFAULT_AUTOCOMMIT = true;
    public static final int DEFAULT_MAX_IDLE_CONNECTIONS = 1;
    public static final long DEFAULT_EVICTION_TIMER_PERIOD = -1L;
    public static final long DEFAULT_MIN_EVICTION_IDLE_MILLIS = -1L;
    
    
    private static final Logger logger = FarragoTrace.getClassTracer(PDIMedDataServer.class);
    
    protected Properties connectProps;
    protected String userName;
    protected String password;
    protected String url;
    protected String catalogName;
    protected String schemaName;
    protected String [] tableTypes;
    protected String loginTimeout;
    private int maxIdleConnections;
    private long evictionTimerPeriodMillis;
    private long minEvictionIdleMillis;


    protected boolean supportsMetaData;
    private PDIMetaData databaseMetaData;

    protected String validationQuery;

    protected boolean useSchemaNameAsForeignQualifier;
    protected boolean lenient;
    protected Pattern disabledPushdownPattern;
    private int fetchSize;
    protected HashMap<String, Map<String, String>> schemaMaps;
    protected HashMap<String, Map<String, Source>> tableMaps;
    protected Map<String, List<WildcardMapping>> tablePrefixMaps;
    
    // JNDI DataSource name
    protected String jndiName;

 
	protected PDIMedDataServer(String serverMofId, Properties props) {
		super(serverMofId, props);
		// TODO Auto-generated constructor stub
	}


	public void initialize() throws Exception {
        Properties props = getProperties();
		initializeDataSource();

		PDIMetaData databaseMetaData = getDatabaseMetaData();

		String schemaMapping = props.getProperty(PROP_SCHEMA_MAPPING);
		String tableMapping = props.getProperty(PROP_TABLE_MAPPING);
		String tablePrefixMapping = props.getProperty(PROP_TABLE_PREFIX_MAPPING);

       try {
           if (((schemaMapping != null) && (tableMapping != null))
               || ((schemaMapping != null) && (tablePrefixMapping != null))
               || ((tableMapping != null) && (tablePrefixMapping != null))) {
               throw FarragoResource.instance().MedJdbc_InvalidTableSchemaMapping.ex();
           }

           if (schemaMapping != null) {
               parseMapping(databaseMetaData, schemaMapping, false, false);
           } else if (tableMapping != null) {
               parseMapping(databaseMetaData, tableMapping, true, false);
           } else if (tablePrefixMapping != null) {
               parseMapping(databaseMetaData, tablePrefixMapping, true, true);
           }
       } catch (RuntimeException e) {
           logger.log(Level.SEVERE, "Error initializing PDIMed mappings", e);
           closeAllocation();
           throw e;
       }
	}

	
    private void parseMapping(PDIMetaData databaseMetaData, String mapping,
            boolean isTableMapping, boolean isTablePrefixMapping) {
        
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
        if ((key == null) || (value == null)) {
            return;
        }

        if (!key.equals("") && !value.equals("")) {
            Map<String, String> h = new HashMap<String, String>();
            if (schemaMaps.get(value) != null) {
                h = schemaMaps.get(value);
            }
            PDIIterator iterator = null;
            try {
            	iterator = databaseMetaData.getTables(catalogName, key, null, tableTypes);
                if (iterator == null) {
                    return;
                }
                while (iterator.hasNext()) {
                    h.put((String)iterator.next(), key);
                }
                schemaMaps.put(value, h);
            } catch (Throwable ex) {
                // assume unsupported
                return;
            } finally {

            }
        }
    }

    private void createTableMaps(String srcSchema, String srcTable, String targetSchema,
            String targetTable) {
        if ((srcSchema == null) || (srcTable == null) || (targetSchema == null) || (targetTable == null)) {
            return;
        }

        Map<String, Source> h = tableMaps.get(targetSchema);
        if (h == null) {
            h = new HashMap<String, Source>();
        }

        // validate that the same table name is not mapped to the same schema
        // name
        Source src = h.get(targetTable);
        if (src != null) {
            // forgive the instance where the same source_schema and
            // source_table are mapped again
            if (!src.getSchema().equals(srcSchema) || !src.getTable().equals(srcTable))
            {
                throw FarragoResource.instance().MedJdbc_InvalidTableMapping.ex(
                    src.getSchema(), src.getTable(), srcSchema, srcTable,
                    targetSchema, targetTable);
            }
        }
        h.put(targetTable, new Source(srcSchema, srcTable));
        tableMaps.put(targetSchema, h);
    }

    
    private void createTablePrefixMaps(String srcSchema, String srcTablePrefix, String targetSchema,
        String targetTablePrefix) {
        if ((srcSchema == null) || (srcTablePrefix == null) || (targetSchema == null) || (targetTablePrefix == null)) {
            return;
        }

        if (srcTablePrefix.endsWith("%")) {
            srcTablePrefix = srcTablePrefix.substring(0, srcTablePrefix.length() - 1);
        }

        if (targetTablePrefix.endsWith("%")) {
            targetTablePrefix = targetTablePrefix.substring(0, targetTablePrefix.length() - 1);
        }

        List<WildcardMapping> list = tablePrefixMaps.get(targetSchema);
        if (list == null) {
            list = new ArrayList<WildcardMapping>();
            tablePrefixMaps.put(targetSchema, list);
        }

        WildcardMapping mapping = new WildcardMapping(
                targetTablePrefix, srcSchema, srcTablePrefix);

        for (WildcardMapping m : list) {
            if (m.targetTablePrefix.equals(targetTablePrefix)) {
                // forgive the instance where the same source_schema and
                // souoce_table are mapped again
                if (!m.getSourceSchema().equals(srcSchema) || !m.getSourceTablePrefix().equals(srcTablePrefix)) {
                    throw FarragoResource.instance().MedJdbc_InvalidTablePrefixMapping.ex(
                        m.getSourceSchema(), m.getSourceTablePrefix(), srcSchema, srcTablePrefix,
                        targetSchema, targetTablePrefix);
                }
            }
        }

        list.add(mapping);
    }

    private void initializeDataSource() {
    	//TODO  Auto-generated method stub
    }	

	@Override
	public FarragoMedNameDirectory getNameDirectory() throws SQLException {
		// TODO Auto-generated method stub
		return super.getNameDirectory();
	}

	@Override
	public void registerRules(RelOptPlanner planner) {
		// TODO Auto-generated method stub
		super.registerRules(planner);
	}

	@Override
	public void closeAllocation() {
		// TODO Auto-generated method stub
		super.closeAllocation();
	}

	public static void removeNonDriverProps(Properties driverProps) {
		// TODO Auto-generated method stub
        // TODO Prasanna 03092010-1:13PM ----  Make this metadata-driven.

	}



	public FarragoMedColumnSet newColumnSet(String[] arg0, Properties arg1, FarragoTypeFactory arg2, RelDataType arg3, Map<String, Properties> arg4) throws SQLException {
		// TODO Auto-generated method stub
		return null;
	}



	public PDIMetaData getDatabaseMetaData() {

        assert (databaseMetaData != null);

        return databaseMetaData;
		// TODO Auto-generated method stub
		//return null;
	}

    private boolean isQuoteChar(String mapping, int index) {
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
        
    private void initMetaData()
    {
        try {
            databaseMetaData = getMetaData();
            supportsMetaData = true;
        } catch (Exception ex) {
            //Util.swallow(ex, logger);
        }

        if (databaseMetaData == null) {
            // driver can't even support getMetaData(); treat it
            // as brain-damaged
            databaseMetaData =
                (PDIMetaData) Proxy.newProxyInstance(
                    null,
                    new Class[] { PDIMetaData.class },
                    new SqlUtil.DatabaseMetaDataInvocationHandler(
                        "UNKNOWN",
                        ""));
            supportsMetaData = false;
        }
    }
    

	/**
     * Retrieves the configured user name for this data server. Subclasses may
     * override this method to obtain the user name from an alternate source.
     *
     * @return user name for this data server
     */
    protected String getUserName()
    {
        return userName;
    }

    /**
     * Retrieves the configured password for this data server. Subclasses may
     * override this method to obtain the password from an alternate source.
     *
     * @return password for this data server
     */
    protected String getPassword()
    {
        return password;
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

    private PDIMetaData getMetaData() {
    	String url = ""; //TODO urlString should be supplied
    	PDIMetaData metaData = new PDIMetaData(url);
    	return metaData;
		// TODO Auto-generated method stub
		//return null;
	}
}
