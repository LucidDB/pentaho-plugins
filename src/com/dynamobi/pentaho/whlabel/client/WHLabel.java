/*
 * This program is free software; you can redistribute it and/or modify it under the 
 * terms of the GNU Lesser General Public License, version 2.1 as published by the Free Software 
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this 
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/old-licenses/lgpl-2.1.html 
 * or from the Free Software Foundation, Inc., 
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * Copyright 2009 Pentaho Corporation.  All rights reserved.
 *
 * Created May 20, 2009
 * @author Aaron Phillips
 */

package com.dynamobi.pentaho.whlabel.client;


import com.google.gwt.core.client.EntryPoint;
import com.google.gwt.core.client.GWT;
import com.google.gwt.event.dom.client.ChangeEvent;
import com.google.gwt.event.dom.client.ChangeHandler;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.rpc.AsyncCallback;
import com.google.gwt.user.client.rpc.ServiceDefTarget;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.FlexTable;
import com.google.gwt.user.client.ui.HTMLTable.Cell;
import com.google.gwt.user.client.ui.HorizontalPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.ListBox;
import com.google.gwt.user.client.ui.RootPanel;
import com.google.gwt.user.client.ui.TextBox;
import com.google.gwt.user.client.ui.VerticalPanel;

public class WHLabel implements EntryPoint {

	private VerticalPanel mainPanel = new VerticalPanel();
	private VerticalPanel dropDownPanel = new VerticalPanel();
	private HorizontalPanel buttonPanel = new HorizontalPanel();
	private Button unsetLabelButton = new Button("Unset Label");
	private Button setLabelButton = new Button("Set Label");
	private Button cancelButton = new Button("Cancel");
	private ListBox dsListBox = new ListBox();
    private WHDataGrid labelTable = new WHDataGrid();
	private FlexTable buttonTable = new FlexTable();
	private Label currSelectedLabel = new Label();
	
	public void onModuleLoad() {
		dropDownPanel.setSpacing(20);
		currSelectedLabel.setWidth("300");
		setDataSources();
		dropDownPanel.add(dsListBox);
		labelTable.setHeader(0, "Warehouse Label");
		labelTable.setHeader(1, "Timestamp");
		labelTable.setHeight("100");
		labelTable.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent event) {
		        Cell cell = labelTable.getCellForEvent(event);
		        int rowIndex = cell.getRowIndex();
		    	for (int i = 0; i < labelTable.getRowCount(); i++)
		    		labelTable.getRowFormatter().setStyleName(i, "dwTableRow");
		        labelTable.getRowFormatter().setStyleName(rowIndex, "selectedRow");
			}
		});
		
		labelTable.setStyleName("labelTable");
		dropDownPanel.add(labelTable);
		buttonTable.setWidget(0, 0, unsetLabelButton);

		unsetLabelButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent bce) {
				String selectedLabel = "null";
				final String currentSchema = dsListBox.getItemText(dsListBox.getSelectedIndex());
				setDWLabel(currentSchema, selectedLabel);
			}
		});
		
		setLabelButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent bce) {
				String selectedLabel = "";
				for (int i = 0; i < labelTable.getRowCount(); i++) {
					if (labelTable.getRowFormatter().getStyleName(i).equalsIgnoreCase("selectedRow"))
						selectedLabel = labelTable.getText(i, 0);
				}
				selectedLabel += " "+dsListBox.getItemText(dsListBox.getSelectedIndex());
				for (int i = 0; i < labelTable.getRowCount(); i++) {
					if (labelTable.getRowFormatter().getStyleName(i).equalsIgnoreCase("selectedRow"))
						selectedLabel = labelTable.getText(i, 0);
				}
				//selectedLabel += " "+dsListBox.getItemText(dsListBox.getSelectedIndex());
				final String currentSchema = dsListBox.getItemText(dsListBox.getSelectedIndex());
				setDWLabel(currentSchema, selectedLabel);
			}
		});
		
		cancelButton.addClickHandler(new ClickHandler() {
			public void onClick(ClickEvent bce) {
				getDWLabel();
			}
		});
		
		buttonTable.setWidget(0, 1, setLabelButton);
		buttonTable.setWidget(0, 2, cancelButton);
		buttonTable.getCellFormatter().setStyleName(0, 0, "buttonLeft");
		buttonTable.getCellFormatter().setStyleName(0, 1, "buttonCenter");
		buttonTable.getCellFormatter().setStyleName(0, 2, "buttonRight");
		buttonTable.setStyleName("buttonTable");
		buttonPanel.add(buttonTable);
		dropDownPanel.add(buttonPanel);
		mainPanel.add(dropDownPanel);
		RootPanel.get("description").add(mainPanel);
		
		HorizontalPanel currLabelPanel = new HorizontalPanel();
		currLabelPanel.add(currSelectedLabel);
		RootPanel.get("warehouseLabel").add(currLabelPanel);

		dsListBox.addChangeHandler(new ChangeHandler() {
			public void onChange(ChangeEvent arg0) {
				final String currentSchema = dsListBox.getItemText(dsListBox.getSelectedIndex());
				updateDWLabels(currentSchema);
			}
		});
	}

	private String getBaseUrl() {
		String moduleUrl = GWT.getModuleBaseURL();
		if(moduleUrl.indexOf("content") > -1) {
			String baseUrl = moduleUrl.substring(0, moduleUrl.indexOf("content"));
			return  baseUrl + "gwtrpc/labelService";
		}
		return moduleUrl + "gwtrpc";
	}

	private void setDataSources() {
		WHLabelServiceAsync labelService = GWT.create(WHLabelService.class);
	    ServiceDefTarget endpoint = (ServiceDefTarget) labelService;
	    endpoint.setServiceEntryPoint(getBaseUrl());
	    AsyncCallback<String[]> callback = new AsyncCallback<String[]>() {
	    	public void onFailure(Throwable caught) {
	    		caught.printStackTrace();
	    	}
	    	public void onSuccess(String[] result) {
	    		for (int i = 0; i < result.length; i++)
	    			dsListBox.addItem((String)result[i]);
				updateDWLabels(result[0]);
	    	}
	    };
	    labelService.getDataSources(callback);
	}


	private void updateDWLabels(String currentSchema) {
    	while (labelTable.getRowCount() > 0)
    		labelTable.removeRow(labelTable.getRowCount()-1);
		WHLabelServiceAsync labelService = GWT.create(WHLabelService.class);
	    ServiceDefTarget endpoint = (ServiceDefTarget) labelService;
	    endpoint.setServiceEntryPoint(getBaseUrl());
	    AsyncCallback<String[]> callback = new AsyncCallback<String[]>() {
	        public void onFailure(Throwable caught) {
	        	caught.printStackTrace();
	        }
	        public void onSuccess(String[] result) {
	        	for (int i = 0; i < result.length -1; i++) {
	        		String labelName = result[i].substring(0, result[i].indexOf("~"));
	        		String creationTimeStamp = result[i].substring(result[i].indexOf("~") +1, result[i].length());
	        		labelTable.setText(i, 0, labelName);
	        		labelTable.setText(i, 1, creationTimeStamp);
	        		labelTable.getRowFormatter().setStyleName(i, "dwTableRow");
	        		labelTable.getCellFormatter().setStyleName(i, 0, "dwLabelCell");
	        		labelTable.getCellFormatter().setStyleName(i, 1, "dwTimestampCell");
	        		labelTable.setVisible(true);
	        	}
        		String currSetLabel = "Active Warehouse Label - " + result[result.length-1];
        		currSelectedLabel.setText(currSetLabel);
	        }
	    };
	    labelService.getDWLables(currentSchema, callback);
	}

	private void setDWLabel(String currentSchema, final String selectedLabel) {
		WHLabelServiceAsync labelService = GWT.create(WHLabelService.class);
	    ServiceDefTarget endpoint = (ServiceDefTarget) labelService;
	    endpoint.setServiceEntryPoint(getBaseUrl());
	    AsyncCallback<Integer> callback = new AsyncCallback<Integer>() {
	    	public void onFailure(Throwable caught) {
	    		caught.printStackTrace();
	    	}

	    	public void onSuccess(Integer result) {
				String currSetLabel = "";
				if (selectedLabel.equalsIgnoreCase("null"))
					currSetLabel = "unset"; 
				else
					currSetLabel = selectedLabel; 
				WHBlindedPopup bpp = new WHBlindedPopup("Warehouse Label is set --> " + selectedLabel, "Set Wareshouse Label" , true);
				currSelectedLabel.setText("Active Warehouse Label - " +currSetLabel);
	    	}
	    };
	    labelService.setDWLabel(currentSchema, selectedLabel, callback);
	}

	private void getDWLabel() {
		WHLabelServiceAsync labelService = GWT.create(WHLabelService.class);
	    ServiceDefTarget endpoint = (ServiceDefTarget) labelService;
	    endpoint.setServiceEntryPoint(getBaseUrl());
	    AsyncCallback<String> callback = new AsyncCallback<String>() {
	    	public void onFailure(Throwable caught) {
	    		caught.printStackTrace();
	    	}

			public void onSuccess(String result) {
				WHBlindedPopup bpp = new WHBlindedPopup("get Warehouse Label -- " + result, "Set Wareshouse Label", true);
			}
    	};
	    labelService.getDWLabel(callback);
	}

	
	native  public static void close()/*-{
	 $wnd.close();
	}-*/;	
}
