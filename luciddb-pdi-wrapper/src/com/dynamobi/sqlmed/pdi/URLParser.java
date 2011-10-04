/*
 * This program is free software; you can redistribute it and/or modify it under the 
 * terms of the GNU Lesser General Public License, version 2 as published by the Free Software 
 * Foundation.
 *
 * You should have received a copy of the GNU Lesser General Public License along with this 
 * program; if not, you can obtain a copy at http://www.gnu.org/licenses/lgpl-2.0.html 
 * or from the Free Software Foundation, Inc., 
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; 
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Lesser General Public License for more details.
 *
 * Copyright 2008 Bayon Technologies, Inc.  All rights reserved. 
 */
package com.dynamobi.sqlmed.pdi;

import java.util.ArrayList;
import java.util.StringTokenizer;

public class URLParser {
	private static final String TOKEN1 = "|";
	private static final String TOKEN2 = "&";
	private static final String TOKEN3 = "=";
	private String pdiUrl;
	private String[] options;

	public String getPdiUrl() {
		return pdiUrl;
	}

	public void setPdiUrl(String pdiUrl) {
		this.pdiUrl = pdiUrl;
	}

	public String[] getOptions() {
		return options;
	}

	public void setOptions(String[] options) {
		this.options = options;
	}

	public URLParser() {

	}

	public void parse(String url) {

		ArrayList<String> list = new ArrayList<String>();
		
		int index = url.indexOf(TOKEN1);
		if (index != -1) {
			this.pdiUrl = url.substring(0, index);
			if(url.length()>(index+1))
			{
				String tmp = url.substring(index+1);
				StringTokenizer st = new StringTokenizer(tmp,TOKEN2);
				options = new String[st.countTokens()];
				int i =0;
				while(st.hasMoreTokens())
				{
					String tmpStr = st.nextToken();
					tmpStr= java.net.URLDecoder.decode(tmpStr);
					options[i]=tmpStr;
					i++;
				}
			}
			
		}
		else
		{
			this.pdiUrl = url;
		}

	}

}
