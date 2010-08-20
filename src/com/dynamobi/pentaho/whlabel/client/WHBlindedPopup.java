package com.dynamobi.pentaho.whlabel.client;

import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.event.dom.client.ClickHandler;
import com.google.gwt.user.client.DOM;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.HasAlignment;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.PopupPanel;
import com.google.gwt.user.client.ui.VerticalPanel;

class WHBlindedPopup implements ClickHandler
{
    PopupPanel popup;
    PopupPanel glass;
    public WHBlindedPopup(String message, String headerMessage, boolean addDefaultStyles)
    {
        /*********************************************
         * A glass panel or 'blinder'
         * to wash out the current screen
         ********************************************/
        glass = new PopupPanel();
        glass.setStyleName("rx-glass");
        /*
         * Set full screen
         */
        DOM.setStyleAttribute(glass.getElement(), "width", Window.getClientWidth()+"");
        DOM.setStyleAttribute(glass.getElement(), "height", Window.getClientHeight()+"");
        /*
         * Add default styles if required
         */
        if (addDefaultStyles) {
            DOM.setStyleAttribute(glass.getElement(), "backgroundColor", "#000");
            DOM.setStyleAttribute(glass.getElement(), "opacity", "0.70");
            DOM.setStyleAttribute(glass.getElement(), "-moz-opacity", "0.70");
            DOM.setStyleAttribute(glass.getElement(), "filter",  " alpha(opacity=70)");
        }
        /**********************************************
         * A popup
         *********************************************/
        popup = new PopupPanel(false);
        popup.setStyleName("rx-BlindedPopup");
        /*
         * Add default styles if required
         */
        if (addDefaultStyles) {
            DOM.setStyleAttribute(popup.getElement(), "backgroundColor", "#fff");
            DOM.setStyleAttribute(popup.getElement(), "border", "3px solid silver");
        }
        /*
         * Popups can only hold one widget,
         * so we need something to keep all
         * our bits in
         */
        VerticalPanel popupContents = new VerticalPanel();
        /*
         * The header element
         */
        // -- test to find the parent
        //headerMessage += " --> ";// + glass.getParent().getElement().getClassName();
        //headerMessage += " --> " + glass.getElement().getParentElement().getParentElement().getNodeName();
        
        Label header = new Label(headerMessage);
        header.setStyleName("rx-BlindedPopup-header");
        if (addDefaultStyles) {
            DOM.setStyleAttribute(header.getElement(), "backgroundColor", "#D3D3D3");
            DOM.setStyleAttribute(header.getElement(), "borderBottom", "3px solid silver");
            DOM.setStyleAttribute(header.getElement(), "fontWeight", "bold");
            DOM.setStyleAttribute(header.getElement(), "fontSize", "90%");
            DOM.setStyleAttribute(header.getElement(), "padding", "5px");
            DOM.setStyleAttribute(header.getElement(), "textAlign", "center");
        }
        /*
         * The main element
         */
        HTML html = new HTML(message);
        html.setStyleName("rx-BlindedPopup-message");
        if (addDefaultStyles) {
            DOM.setStyleAttribute(html.getElement(), "fontSize", "80%");
            DOM.setStyleAttribute(html.getElement(), "padding", "15px");
        }
        /*
         * A button to close the popup
         */
        Button closeButton = new Button("Close", this);
        DOM.setStyleAttribute(closeButton.getElement(), "width", "80px");
        /*
         * Assemble it all
         */
        popupContents.add(header);
        popupContents.add(html);
        popupContents.add(closeButton);
        popupContents.setCellHorizontalAlignment(closeButton, HasAlignment.ALIGN_CENTER);
        popup.add(popupContents);
        /*
         * Show the glass first, then the popup will be over it
         */
        glass.show();
        popup.center();
    }
    
	public void onClick(ClickEvent arg0) {
        popup.hide();
        glass.hide();
 	}

}