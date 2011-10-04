package com.dynamobi.sqlmed.pdi;

import java.util.logging.Level;
import java.util.logging.Logger;

import net.sf.farrago.trace.FarragoTrace;

import org.eigenbase.relopt.RelOptRule;
import org.eigenbase.relopt.RelOptRuleCall;
import org.eigenbase.relopt.RelOptRuleOperand;

public class PDIPushDownRule extends RelOptRule {

    private static final Logger logger = FarragoTrace.getClassTracer(PDIPushDownRule.class);
    
	public PDIPushDownRule(RelOptRuleOperand operand, String description) {
		super(operand, description);
        logger.log(Level.SEVERE, "################ in Constructor PDIPushDownRule(RelOptRuleOperand, String)");
		// TODO Auto-generated constructor stub
	}

	public PDIPushDownRule(RelOptRuleOperand operand) {
		super(operand);
        logger.log(Level.SEVERE, "################ in Constructor PDIPushDownRule(RelOptRuleOperand)");
		// TODO Auto-generated constructor stub
	}

	@Override
	public void onMatch(RelOptRuleCall call) {
		// TODO Auto-generated method stub
        logger.log(Level.SEVERE, "################ in method PDIPushDownRule.onMatch(RelOptRuleCall)");
	}
	
	

}
