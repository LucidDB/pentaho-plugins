package org.dynamobi.luciddb;

import java.util.*;
import java.io.*;

public class LucidDbLauncher {

  public static boolean launched = false;

  private static Process p;
  private static BufferedReader reader;
  private static BufferedWriter writer;

  public static void start(String dir) {
    String lucid = dir;
    if (System.getProperty("os.name").startsWith("Windows")) {
      lucid += "\\lucidDbServer.bat";
    } else {
      lucid += "/lucidDbServer";
    }
    ProcessBuilder pb = new ProcessBuilder(lucid);
    Map<String, String> env = pb.environment();
    //env.put("JAVA_HOME", System.getProperty("java.home") + "../");
    //env.put("JAVA_HOME", "/usr/lib/jvm/java-6-sun/");
    pb.directory(new File(dir));
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

