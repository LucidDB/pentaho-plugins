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
import java.io.*;

import org.apache.ant.compress.taskdefs.Unzip;

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
    String install_f = dir;
    String install_dir = dir;
    final String ext;
    if (System.getProperty("os.name").startsWith("Windows")) {
      lucid += "\\luciddb\\bin\\lucidDbServer.bat";
      slash = "\\";
      ext = ".zip";
      bin_dir += "\\luciddb\\bin";
      install_dir += "\\luciddb\\install";
      install_f += "\\luciddb\\install\\install.bat";
    } else {
      lucid += "/luciddb/bin/lucidDbServer";
      ext = ".bz2";
      bin_dir += "/luciddb/bin";
      install_dir += "/luciddb/install";
      install_f += "/luciddb/install/install.sh";
    }
    String zip = dir + slash;
    // Do we need to install first?
    if (!(new File(lucid).exists())) {
      // Get the zip or tar file...
      String[] list = new File(dir).list(new FilenameFilter() {
        public boolean accept(File dir, String f) {
          return f.matches("lucid[a-z0-9_\\-\\.]*\\" + ext);
        }
      });
      String fn = list[0]; // there should only be 1.
      if (ext.equals(".zip")) {
        // TODO: test if this really works in windows
        // (requires chmod +x on bin/lucidDbServer on Linux)
        Unzip un = new Unzip();
        un.setSrc(new File(zip + fn));
        un.setDest(new File(zip));
        un.execute();
      } else if (ext.equals(".bz2")) {
        Runtime r = Runtime.getRuntime();
        try {
          Process p = r.exec("/usr/bin/env tar -jxf " + zip + fn, null, new File(zip));
          try {
            int f = p.waitFor();
            if (f != 0) {
              System.err.println("Failed to extract, " +
                  "exit value = " + p.exitValue());
              return;
            }
          } catch (InterruptedException e) {
            e.printStackTrace();
            return;
          }
        } catch (IOException e) {
          e.printStackTrace();
          return;
        }
      }

      // rename extracted dir to luciddb
      list = new File(dir).list(new FilenameFilter() {
        public boolean accept(File dir, String f) {
          return f.matches("lucid[a-z0-9_\\-\\.]*") &&
                 !f.matches("lucid[a-z0-9_\\-\\.]*\\" + ext);
        }
      });
      fn = list[0];

      File old = new File(zip + fn);
      File ren = new File(zip + "luciddb");
      if (!old.renameTo(ren)) {
        return;
      }

      // run install
      Runtime r = Runtime.getRuntime();
      try {
        String[] env = new String[]{"JAVA_HOME=" + System.getProperty("java.home") + "../"};
        Process p = r.exec(install_f, env, new File(install_dir));
        try {
          int f = p.waitFor();
          if (f != 0) {
            System.err.println("Failed to install, " +
                "exit value = " + p.exitValue());
            return;
          }
        } catch (InterruptedException e) {
          e.printStackTrace();
          return;
        }
      } catch (IOException e) {
        e.printStackTrace();
        return;
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
    readAll();
    close();
    launched = false;
  }

  public static String read() {
    // Reads a single line, returns null if no line is available for reading.
    String line = null;
    try {
      if (reader.ready()) {
        line = reader.readLine();
        if (line != null)
          System.out.println(line);
      }
    } catch (IOException e) {
      e.printStackTrace();
    }
    return line;
  }

  public static void readAll() {
    // Do not call this unless we are quitting, as readLine will
    // block.
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

