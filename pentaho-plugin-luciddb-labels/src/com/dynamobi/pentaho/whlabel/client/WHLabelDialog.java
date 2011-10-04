package com.dynamobi.pentaho.whlabel.client;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.DockPanel;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.Label;

public class WHLabelDialog extends DialogBox implements ClickHandler{

	public WHLabelDialog() {

		 //Panel gp = new Panel();
		 Label content = new Label();
		 content.setStyleName("Content");
		 content.setSize("100%", "100%");
		 //gp.add(content);
		 //gp.setVisible(true);
		 
		setText("Sample DialogBox");
		Button closeButton = new Button("Close", this);
		HTML msg = new HTML("<center>A standard dialog box component.</center>",true);

		DockPanel dock = new DockPanel();
		dock.setSpacing(4);

		dock.add(closeButton, DockPanel.SOUTH);
		dock.add(msg, DockPanel.NORTH);

		dock.setCellHorizontalAlignment(closeButton, DockPanel.ALIGN_RIGHT);
		dock.setWidth("100%");
		setWidget(dock);
	}

	public void onClick(ClickEvent ce) {
		hide();
	}

}
