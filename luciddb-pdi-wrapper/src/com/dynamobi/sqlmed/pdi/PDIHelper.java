package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;
import java.util.StringTokenizer;

import org.pentaho.di.core.exception.KettleException;
import org.pentaho.di.core.row.RowMeta;
import org.pentaho.di.core.row.RowMetaInterface;
import org.pentaho.di.core.row.ValueMetaInterface;
import org.pentaho.di.core.util.EnvUtil;
import org.pentaho.di.core.vfs.KettleVFS;
import org.pentaho.di.core.xml.XMLHandler;
import org.pentaho.di.trans.StepLoader;
import org.pentaho.di.trans.TransMeta;
import org.pentaho.di.trans.step.StepMeta;
import org.pentaho.di.trans.step.StepMetaInterface;
import org.w3c.dom.Document;


public class PDIHelper {
	private Map rowMetaMap = new Hashtable();

	public PDIHelper() {
		init();
	}

	private void init() {
		try {
			StepLoader.init();
		} catch (KettleException e1) {

			e1.printStackTrace();
		}
		EnvUtil.environmentInit();

	}

	public Map<String, String[]> visitDirectory(File f) {
		Map<String, String[]> stepsMap = new HashMap<String, String[]>();
		File[] files = f.listFiles();
		if (files != null) {

			for (int i = 0; i < files.length; i++) {
				try {
					if (files[i].getName().lastIndexOf("ktr") != -1) {

						TransMeta tm = new TransMeta(files[i].getAbsolutePath());
//						System.out.println("visitDirectory:"
//								+ java.util.Arrays.toString(tm.getStepNames()));

						String name = files[i].getName();
						name = name.substring(0, name.length() - 4);
						stepsMap.put(name, tm.getStepNames());
						StepMeta retval[] = tm.getStepsArray();
						for (int j = 0; j < retval.length; j++) {
							StepMeta s = retval[j];
							StepMetaInterface si = s.getStepMetaInterface();
							String sname = s.getName();
							RowMetaInterface ri = tm.getStepFields(sname);
							this.rowMetaMap.put(sname, ri);
						}

					}
				} catch (Exception e) {

					e.printStackTrace();

				}
			}
		}
		return stepsMap;

	}

	public Map<String, String[]> getSteps(File f) {

		Map<String, String[]> stepsMap = new HashMap<String, String[]>();

		try {
			if (f.getName().lastIndexOf("ktr") != -1) {

				TransMeta tm = new TransMeta(f.getAbsolutePath());
				String name = f.getName();
				name = name.substring(0, name.length() - 4);
				stepsMap.put(name, tm.getStepNames());
				StepMeta retval[] = tm.getStepsArray();
				for (int j = 0; j < retval.length; j++) {
					StepMeta s = retval[j];
					StepMetaInterface si = s.getStepMetaInterface();
					String sname = s.getName();
					RowMetaInterface ri = tm.getStepFields(sname);
					this.rowMetaMap.put(sname, ri);
				}
			}
		} catch (Exception e) {

			e.printStackTrace();

		}

		return stepsMap;
	}

	RowMeta getRowMeta(String stepName) {
		RowMeta rm = null;
		Object obj = this.rowMetaMap.get(stepName);
		if (obj != null) {
			rm = (RowMeta) obj;
		}
		return rm;
	}
	
	public static void main(String[] args) {
		String s = "examplecsv.Sort rows by Year.Year as Year2,     examplecsv.Sort rows by Year.PresentsRequested,  examplecsv.Sort rows by Year.PresentsNickReceived";
		StringTokenizer st = new StringTokenizer(s,",");
		System.out.println(st.countTokens());
		PDIHelper.parse();
	}
	
	private static void parse()
	{
		
	}
	
	private static int translateType (int kettleType){
		switch (kettleType) {
		case ValueMetaInterface.TYPE_BIGNUMBER: return java.sql.Types.NUMERIC;
		case ValueMetaInterface.TYPE_BINARY: return java.sql.Types.BINARY;
		case ValueMetaInterface.TYPE_BOOLEAN: return java.sql.Types.BOOLEAN;
		case ValueMetaInterface.TYPE_DATE: return java.sql.Types.TIMESTAMP;
		case ValueMetaInterface.TYPE_INTEGER: return java.sql.Types.INTEGER;
		case ValueMetaInterface.TYPE_NONE: return java.sql.Types.JAVA_OBJECT;
		case ValueMetaInterface.TYPE_NUMBER: return java.sql.Types.NUMERIC;
		case ValueMetaInterface.TYPE_SERIALIZABLE: return java.sql.Types.LONGVARCHAR;
		case ValueMetaInterface.TYPE_STRING: return java.sql.Types.VARCHAR;
		default: return java.sql.Types.OTHER;
		}
	}
}