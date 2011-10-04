package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.eigenbase.util.Util;

import net.sf.farrago.namespace.impl.MedAbstractBase;
import net.sf.farrago.trace.FarragoTrace;

public class PDIKtrFileParams extends MedAbstractBase{
	
    public static final String PROP_DIRECTORY = "DIRECTORY";
    public static final String PROP_KTR_FILE = "KTR_FILE";
    public static final String PROP_FILE_EXTENSION = "FILE_EXTENSION";
    protected static final int DEFAULT_NUM_ROWS_SCAN = 5;


    
    protected static final String DEFAULT_FILE_EXTENSION = "ktr";
    public static final String FILE_EXTENSION_PREFIX = ".";
    
    private Properties props;
    private String directory;
    private String ktrFile;
    private String fileExtension;
    
    private static final Logger logger = FarragoTrace.getClassTracer(PDIKtrFileParams.class);
    
    
    public enum SchemaType
    {
        /**
         * Schema name for a special type of query that returns a one column
         * result with space separated columns sizes
         */
        DESCRIBE("DESCRIBE"),

        /**
         * Schema name for a special type of query that returns parsed text
         * columns (including headers) as they appear in a ktr file. Sample
         * queries are limited to a specified number of rows
         */
        SAMPLE("SAMPLE"),

        /**
         * Schema name for a typical query, in which columns are casted to typed
         * data
         */
        QUERY(new String[] { "PDI", "DEFAULT" }),

        /**
         * Schema name for a query in which columns are returned as text.
         * Similar to sample, except headers are not returned, and there is no
         * limit on the amount of rows returned.
         */
        QUERY_TEXT("TEXT");

        private static Map<String, SchemaType> types;

        static {
            types = new HashMap<String, SchemaType>();
            for (SchemaType type : SchemaType.values()) {
                for (String name : type.schemaNames) {
                    types.put(name, type);
                }
            }
        }

        public static SchemaType getSchemaType(String schemaName)
        {
            return types.get(schemaName);
        }

        private String schemaName;
        private String [] schemaNames;

        private SchemaType(String schemaName)
        {
            this.schemaName = schemaName;
            this.schemaNames = new String[] { schemaName };
        }

        private SchemaType(String [] schemaNames)
        {
            this.schemaName = schemaNames[0];
            this.schemaNames = schemaNames;
        }

        public String getSchemaName()
        {
        	return schemaName;
        }
    }
    public PDIKtrFileParams(Properties props) {
        this.props = props;
    }

	public void decode() throws SQLException {
		directory = decodeDirectory(props.getProperty(PROP_DIRECTORY, null));	
		ktrFile = decodeKtrFile(props.getProperty(PROP_KTR_FILE));
        fileExtension = decodeExtension(props.getProperty(PROP_FILE_EXTENSION, DEFAULT_FILE_EXTENSION));
    	
    	
    }
    
    
    private String decodeDirectory(String directory) {
        if (directory == null) {
            return "";
        }
        if (directory.endsWith(File.separator) || directory.endsWith("/")) {
            return directory;
        }
        return directory + File.separator;
    }
    
    private String decodeKtrFile(String ktrFile) {
    	if(ktrFile == null) {
    		return "";
    	}
    	if(ktrFile.endsWith(".ktr")){
    		return ktrFile;
    	}
    	return ktrFile;
    }
    
    private String decodeExtension(String extension) {
        Util.pre(extension != null, "extension != null");
        if ((extension.length() == 0) || extension.startsWith(FILE_EXTENSION_PREFIX)) {
            return extension;
        }
        return FILE_EXTENSION_PREFIX + extension;
    }
    
    public String getDirectory() {
        return directory;
    }
    
    public String getKtrFile() {
    	return ktrFile;
    }

    public String getFileExtenstion() {
        return fileExtension;
    }
    
    public static SchemaType getSchemaType(String schemaName, boolean queryDefault) {
        SchemaType type = SchemaType.getSchemaType(schemaName); 
        if ((type == null) && queryDefault) {
        	type = SchemaType.QUERY;
        }
        return type;
	}

}
