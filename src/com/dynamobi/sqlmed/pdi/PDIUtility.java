package com.dynamobi.sqlmed.pdi;

import java.io.File;
import java.util.Iterator;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.trace.FarragoTrace;

import org.pentaho.di.trans.StepLoader;
import org.pentaho.di.trans.TransMeta;
import org.pentaho.di.trans.Trans;
import org.pentaho.di.trans.step.StepMeta;
import org.pentaho.di.trans.step.StepMetaInterface;
import org.pentaho.di.core.RowMetaAndData;
import org.pentaho.di.core.row.RowMetaInterface;
import org.pentaho.di.core.util.EnvUtil;
import org.pentaho.di.core.exception.KettleException;


public class PDIUtility {
	
	private String transFileName=null;
	private String args[]=null;
	private List<StepMeta> stepsMeta;	
	private TransMeta transMeta;
	private List<RowMetaAndData> rowData;
    private static final Logger logger = FarragoTrace.getClassTracer(PDIUtility.class);
    
    
	public PDIUtility(String transFile,String[] args) {
        logger.log(Level.SEVERE, "################ in Constructor PDIUtility()");
		this.transFileName = transFile;
		this.args = args;
		loadMetaData();
	}
	
	private void loadMetaData() {	
        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() +++ ");
        
		try {
			StepLoader.init();
		} catch (KettleException e1) {
	        logger.log(Level.SEVERE, "################ Exception in method PDIUtility.loadMetaData() call to StepLoader.init() ");
			e1.printStackTrace();
		}
		try {		
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() call to StepLoader.init() ");
			StepLoader.init();
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() ---> done with StepLoader.init();");
			EnvUtil.environmentInit();
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() ---> done with EnvUtil.environmentInit();");
	        File transFile = new File(transFileName);
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() ---> done with transFile");
			TransMeta tm = new TransMeta(transFile.getAbsolutePath());
			StepMeta retval[] = tm.getStepsArray();
			for (int j = 0; j < retval.length; j++) {
				StepMeta s = retval[j];
				StepMetaInterface si = s.getStepMetaInterface();
				String sname = s.getName();
		        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() retval -->  J == " + j + " sname " + sname);

//				RowMetaInterface ri = tm.getStepFields(sname);
//				this.rowMetaMap.put(sname, ri);
			}
			
			
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() -->  done with PDIHelper changes" );
	        transMeta = new TransMeta(transFileName); 
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() -->  done with transMeta = new TransMeta(transFile); ");
	        stepsMeta = transMeta.getSteps();		
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() --> done with stepsMeta = transMeta.getSteps(); ");
	        Trans trans = new Trans(transMeta);
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() --> Trans trans = new Trans(transMeta);");
		}catch(KettleException e){
	        logger.log(Level.SEVERE, "################ in method PDIUtility.loadMetaData() --> Exception " + e.getMessage() + " ++++++++++ get superMessage +++++++++"+ e.getSuperMessage());
			e.printStackTrace();
		}
	}
	
	public StepMeta getMetadata(String stepName) {
        logger.log(Level.SEVERE, "################ in method PDIUtility.getMetadata()");
		StepMeta stepMeta = null;
		Iterator<StepMeta> iStep = stepsMeta.iterator();
		while(iStep.hasNext()) {
			stepMeta = iStep.next();
			if(stepMeta.getName().equals(stepName))
				break;
			stepMeta=null;
		}		
		return stepMeta;
	}
	
	public void getData(String stepName) {
        logger.log(Level.SEVERE, "################ in method PDIUtility.getData()");
		StepMeta stepMeta = getMetadata(stepName);
		
	}
	
	

}
