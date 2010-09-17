package com.dynamobi.sqlmed.pdi;

import java.util.Iterator;
import java.util.List;

import org.pentaho.di.trans.StepLoader;
import org.pentaho.di.trans.TransMeta;
import org.pentaho.di.trans.Trans;
import org.pentaho.di.trans.step.StepMeta;
import org.pentaho.di.core.RowMetaAndData;
import org.pentaho.di.core.util.EnvUtil;
import org.pentaho.di.core.exception.KettleException;


public class PDIUtility {
	
	private String transFile=null;
	private String args[]=null;
	private List<StepMeta> stepsMeta;	
	private TransMeta transMeta;
	private List<RowMetaAndData> rowData;
	
	public PDIUtility(String transFile,String[] args) {
		this.transFile = transFile;
		this.args = args;
		loadMetaData();
	}
	
	private void loadMetaData() {		
		try {		
			StepLoader.init();
			EnvUtil.environmentInit();
			transMeta = new TransMeta(transFile);
			stepsMeta = transMeta.getSteps();		
			Trans trans = new Trans(transMeta);
			trans.execute(null);
			
		}catch(KettleException e){
			e.printStackTrace();
		}
	}
	
	public StepMeta getMetadata(String stepName) {
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
		
	}
	
	

}
