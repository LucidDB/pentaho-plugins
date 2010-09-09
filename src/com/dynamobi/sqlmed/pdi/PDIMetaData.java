package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.pentaho.di.core.RowMetaAndData;
import org.pentaho.di.core.row.RowMeta;
import org.pentaho.di.core.row.ValueMetaInterface;


public class PDIMetaData {

	public final static String driverPrefix = "jdbc:kettle:";
	public static final String TABLE_TYPE_TABLE ="TABLE";
	public static final String TABLE_TYPE_VIEW ="VIEW";

	
	Map<String, String[]> stepsMap = null;
	boolean isDir = false;
	PDIHelper helper = null;
	
	public PDIMetaData(String url) {
		super();
		
		String kettleurl = url.substring(url.indexOf(driverPrefix) + driverPrefix.length());
		URLParser p = new URLParser();
		p.parse(kettleurl);
		helper = new PDIHelper();
		String fileUrl = p.getPdiUrl();
		if (fileUrl.indexOf("file://") != -1) {
			fileUrl = fileUrl.substring(fileUrl.indexOf("file://") + 7);
		} else if (fileUrl.indexOf("file:///") != -1) {
			fileUrl = fileUrl.substring(fileUrl.indexOf("file://") + 8);
		}
		fileUrl = "/"+fileUrl;
		File f = new File(fileUrl);

		if (f.isDirectory()) {
			stepsMap = helper.visitDirectory(f);
			isDir = true;
		} else {
			stepsMap = helper.getSteps(f);
		}
		// TODO Auto-generated constructor stub
	}
	
	public PDIIterator getTables(String catalogName, String key, Object object, String[] tableTypes) {
		// TODO Auto-generated method stub
		return null;
	}

	public String getSchemaTerm() {
		// TODO Auto-generated method stub
		return null;
	}

	public PDIIterator getCatalogs() {
		List<RowMetaAndData> rowAndDatas = new ArrayList<RowMetaAndData>();
		// if USE_TRANSNAME_AS_SCHEMA is true, then we use the filename or
		// transformation name as the schema
		if (!isDir) {
			RowMetaAndData rd = new RowMetaAndData();
			rd.addValue("TABLE_CAT", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
			rowAndDatas.add(rd);
			PDIIterator iterator = convertToPDIIterator(rowAndDatas); 
			return iterator;
		}

		Set set = this.stepsMap.keySet();
		for (Iterator iterator = set.iterator(); iterator.hasNext();) {
			String name = (String) iterator.next();
			RowMetaAndData rd = new RowMetaAndData();
			rd.addValue("TABLE_CAT", ValueMetaInterface.TYPE_STRING, name);
			rowAndDatas.add(rd);
		}
		PDIIterator iterator = convertToPDIIterator(rowAndDatas); 
		return iterator;
	}
	
	public PDIIterator getColumns(String catalog, String schemaPattern,
			String tableNamePattern, String columnNamePattern) {
		List<RowMetaAndData> rowAndDatas = new ArrayList<RowMetaAndData>();
		RowMeta rm = helper.getRowMeta(tableNamePattern);
		String[] columns = rm.getFieldNames();
		for (int i = 0; columns != null && i < columns.length; i++) {
			RowMetaAndData rd = new RowMetaAndData();
			rd.addValue("TABLE_CAT", ValueMetaInterface.TYPE_STRING, catalog);
			rd.addValue("TABLE_SCHEM", ValueMetaInterface.TYPE_STRING, schemaPattern);
			rd.addValue("TABLE_NAME", ValueMetaInterface.TYPE_STRING, tableNamePattern);
			rd.addValue("COLUMN_NAME", ValueMetaInterface.TYPE_STRING, columns[i]);
			rd.addValue("DATA_TYPE", ValueMetaInterface.TYPE_INTEGER, "4");
			rd.addValue("TYPE_NAME", ValueMetaInterface.TYPE_STRING, "");
			rd.addValue("COLUMN_SIZE", ValueMetaInterface.TYPE_INTEGER, columns.length);
			rd.addValue("BUFFER_LENGTH", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("DECIMAL_DIGITS", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("NUM_PREC_RADIX", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("NULLABLE", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("REMARKS", ValueMetaInterface.TYPE_STRING, "");
			rd.addValue("COLUMN_DEF", ValueMetaInterface.TYPE_STRING, "");
			rd.addValue("SQL_DATA_TYPE", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("SQL_DATETIME_SUB", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("CHAR_OCTET_LENGTH", ValueMetaInterface.TYPE_INTEGER, "1");
			rd.addValue("ORDINAL_POSITION", ValueMetaInterface.TYPE_INTEGER, "20");
			rd.addValue("IS_NULLABLE", ValueMetaInterface.TYPE_STRING, "0");
			rd.addValue("SCOPE_CATALOG", ValueMetaInterface.TYPE_STRING, "0");
			rd.addValue("SCOPE_SCHEMA", ValueMetaInterface.TYPE_STRING, "0");
			rd.addValue("SCOPE_TABLE", ValueMetaInterface.TYPE_STRING, "0");
			rd.addValue("SOURCE_DATA_TYPE", ValueMetaInterface.TYPE_INTEGER, "1");
			rowAndDatas.add(rd);
		}
		PDIIterator iterator = convertToPDIIterator(rowAndDatas); 
		return iterator;
	}
	
	public PDIIterator getSchemas() {
		List<RowMetaAndData> rowAndDatas = new ArrayList<RowMetaAndData>();
		// if USE_TRANSNAME_AS_SCHEMA is true, then we use the filename or
		// transformation name as the schema


		Set set = this.stepsMap.keySet();
		for (Iterator iterator = set.iterator(); iterator.hasNext();) {
			String name = (String) iterator.next();
			RowMetaAndData rd = new RowMetaAndData();
			rd.addValue("TABLE_SCHEM", ValueMetaInterface.TYPE_STRING, name);
			rowAndDatas.add(rd);
		}
		PDIIterator iterator = convertToPDIIterator(rowAndDatas); 
		return iterator;
	}
	
	
	public PDIIterator getTables(String catalog, String schemaPattern,
			String tableNamePattern, String[] types) {
		List<RowMetaAndData> rowAndDatas = new ArrayList<RowMetaAndData>();

		if (!isDir) {
			Set tables = this.stepsMap.entrySet();
			for (Iterator iterator = tables.iterator(); iterator.hasNext();) {
				Map.Entry<String, String[]> o = (Map.Entry<String, String[]>) iterator.next();
				String[] values = (String[]) (o.getValue());
				for (int i = 0; i < values.length; i++) {
					RowMetaAndData rd = new RowMetaAndData();
					rd.addValue("TABLE_CAT", ValueMetaInterface.TYPE_STRING, "jdbckettle");
					rd.addValue("TABLE_SCHEM", ValueMetaInterface.TYPE_STRING, "jdbckettle");
					rd.addValue("TABLE_NAME", ValueMetaInterface.TYPE_STRING, values[i]);
					rd.addValue("TABLE_TYPE", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("REMARKS", ValueMetaInterface.TYPE_STRING, "");
					rd.addValue("TYPE_CAT", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("TYPE_SCHEM", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("TYPE_NAME", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("SELF_REFERENCING_COL_NAME", ValueMetaInterface.TYPE_STRING, "");
					rd.addValue("REF_GENERATION", ValueMetaInterface.TYPE_STRING, "");
					rowAndDatas.add(rd);
				}
			}
		} else {
			Set tables = this.stepsMap.entrySet();
			//for BIRT special schema
			
			boolean isBirtSchema = this.stepsMap.keySet().contains(schemaPattern);
			for (Iterator iterator = tables.iterator(); iterator.hasNext();) {
				Map.Entry<String, String[]> o = (Map.Entry<String, String[]>) iterator.next();
				String schema = o.getKey();
				if ((!schema.equals(schemaPattern))&&isBirtSchema) {
					continue;
				}
				String[] values = (String[]) (o.getValue());
				for (int i = 0; i < values.length; i++) {
					RowMetaAndData rd = new RowMetaAndData();
					rd.addValue("TABLE_CAT", ValueMetaInterface.TYPE_STRING, "jdbckettle");
					rd.addValue("TABLE_SCHEM", ValueMetaInterface.TYPE_STRING, "jdbckettle");
					rd.addValue("TABLE_NAME", ValueMetaInterface.TYPE_STRING, values[i]);
					rd.addValue("TABLE_TYPE", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("REMARKS", ValueMetaInterface.TYPE_STRING, "");
					rd.addValue("TYPE_CAT", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("TYPE_SCHEM", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("TYPE_NAME", ValueMetaInterface.TYPE_STRING, TABLE_TYPE_TABLE);
					rd.addValue("SELF_REFERENCING_COL_NAME", ValueMetaInterface.TYPE_STRING, "");
					rd.addValue("REF_GENERATION", ValueMetaInterface.TYPE_STRING, "");
					rowAndDatas.add(rd);
				}
			}
		}
		PDIIterator iterator = convertToPDIIterator(rowAndDatas); 
		return iterator;
	}
	
	public PDIIterator convertToPDIIterator(List rowAndDatas) {
		//TODO 
		return null;
	}
	
}
