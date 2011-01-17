/*
Dynamo Pentaho Plugins is a project for combining Dynamo projects with Pentaho.
Copyright (C) 2011 Dynamo Business Intelligence Corporation

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the Free
Software Foundation; either version 2 of the License, or (at your option)
any later version approved by Dynamo Business Intelligence Corporation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
*/
package org.dynamobi.luciddb;
import org.dynamobi.luciddb.LifeCycleListener;

public class LauncherService {

  public String start() {
    new LifeCycleListener().loaded();
    return "Service started.";
  }

  public String stop() {
    new LifeCycleListener().unLoaded();
    return "Service stopped.";
  }

}
