package com.dynamobi.pentaho.whlabel.client;

import com.google.gwt.user.client.ui.DialogBox;
import com.google.gwt.user.client.ui.HTML;
import com.google.gwt.user.client.ui.RootPanel;

public class WHLightBoxDialog extends DialogBox {

	protected String backgroundScreenHtmlTemplate =
	"< div style= ' "
	        +" background-color: navy; "
	        +"/*needs to be BELOW popup*//*z-index: 3;*/ "
	        +" filter: alpha(opacity=20); opacity:0.2;"
	        +" height: DIV_HEIGHTpx; width: DIV_WIDTHpx; "
	        +" position: absolute; "
	        +" top: 0px; left: 0px; "
	        +"'> ";


	protected HTML backgroundScreen ;

	@Override
	  protected void onLoad() {
	  super.onLoad();
	  attachBackgroundScreenToRootPanel();
	}

	private void attachBackgroundScreenToRootPanel() {
	  if (backgroundScreen == null) {
	    String html = backgroundScreenHtmlTemplate.replaceAll("DIV_WIDTH", ""+RootPanel.get().getOffsetWidth());
	    html = html.replaceAll("DIV_HEIGHT", ""+RootPanel.get().getOffsetHeight());
	    backgroundScreen = new HTML(html);
	  }

//	if ( RootPanel.get().getWidgetIndex(backgroundScreen) > 0) {
	    // background already attached
//	  } else {
	  backgroundScreen.setVisible( true);
	  RootPanel.get().add( backgroundScreen );
//	  }
	}

	/**********************************

	* Constructors

	**********************************/

	public WHLightBoxDialog() {
	  super();
	}


	public WHLightBoxDialog(boolean autoHide) {
	  super(autoHide);
	}


	/**
	* accept custom HTML template for the background:
	* @param backgroundScreenHTMLTemplate
	*/

	public WHLightBoxDialog(String backgroundScreenHTMLTemplate) {
	  this();
	  this.backgroundScreenHtmlTemplate = backgroundScreenHTMLTemplate;
	}


	/**
	* accept custom HTML template for the background:
	* @param backgroundScreenHTMLTemplate
	*/

	public WHLightBoxDialog(String backgroundScreenHTMLTemplate, boolean autoHide) {
	  this(autoHide);
	  this.backgroundScreenHtmlTemplate = backgroundScreenHTMLTemplate;
	}


	/***********************************************************
	* Overriden methods, for supporting an background fading
	***********************************************************/

	@Override
	public void show() {
	  super.show();
	  backgroundScreen.setVisible( true );
	}

	@Override
	  public void hide() {
	  super.hide();
	  backgroundScreen.setVisible( false );
	}

	@Override
	public void hide(boolean autoClosed) {
	  super.hide(autoClosed);
	  backgroundScreen.setVisible( false );
	}
	}