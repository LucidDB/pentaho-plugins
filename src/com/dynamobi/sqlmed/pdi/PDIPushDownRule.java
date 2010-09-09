package com.dynamobi.sqlmed.pdi;

import org.eigenbase.relopt.RelOptRule;
import org.eigenbase.relopt.RelOptRuleCall;
import org.eigenbase.relopt.RelOptRuleOperand;

public class PDIPushDownRule extends RelOptRule {

	
	public PDIPushDownRule(RelOptRuleOperand operand, String description) {
		super(operand, description);
		// TODO Auto-generated constructor stub
	}

	public PDIPushDownRule(RelOptRuleOperand operand) {
		super(operand);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void onMatch(RelOptRuleCall call) {
		// TODO Auto-generated method stub
		
	}
	
	

}
