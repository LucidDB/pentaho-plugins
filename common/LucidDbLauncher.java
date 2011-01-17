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

import java.util.*;
import java.util.zip.*;
import java.io.*;

public class LucidDbLauncher {

  public static boolean launched = false;

  private static Process p;
  private static BufferedReader reader;
  private static BufferedWriter writer;

  public static void start(String dir) {
    // Expects the dir containing luciddb/bin or some archive to be passed.
    String lucid = dir;
    String slash = "/";
    String bin_dir = dir;
    final String ext;
    if (System.getProperty("os.name").startsWith("Windows")) {
      lucid += "\\luciddb\\bin\\lucidDbServer.bat";
      slash = "\\";
      ext = ".zip";
      bin_dir += "\\luciddb\\bin";
    } else {
      lucid += "/luciddb/bin/lucidDbServer";
      ext = ".bz2";
      bin_dir += "/luciddb/bin";
    }
    String zip = dir + slash;
    // Do we need to install first?
    if (!(new File(lucid).exists())) {
      // Get the zip or tar file...
      String[] list = new java.io.File(dir).list(new FilenameFilter() {
        public boolean accept(File dir, String f) {
          return f.matches("lucid[a-z0-9_\\-\\.]*\\" + ext);
        }
      });
      String fn = list[0]; // there should only be 1.
      if (ext.equals(".zip")) {
        // fucking windows
      } else if (ext.equals(".bz2")) {
        // just make the fucking system call
      }
    }

    ProcessBuilder pb = new ProcessBuilder(lucid);
    Map<String, String> env = pb.environment();
    pb.directory(new File(bin_dir));
    try {
      p = pb.start();
    } catch (IOException e) {
      e.printStackTrace();
      return;
    }
    launched = true;

    InputStream pout = p.getInputStream();
    OutputStream pin = p.getOutputStream();
    reader = new BufferedReader(new InputStreamReader(pout));
    writer = new BufferedWriter(new OutputStreamWriter(pin));
  }

  public static void stop() {
    try {
      writer.write("!kill\n");
      writer.flush();
    } catch (IOException e) {
      e.printStackTrace();
    }
    read();
    close();
    launched = false;
  }

  public static void read() {
    try {
      String line;
      while ((line = reader.readLine()) != null)
        System.out.println(line);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }

  public static void close() {
    try {
      p.getInputStream().close();
      p.getOutputStream().close();
      p.getErrorStream().close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}

