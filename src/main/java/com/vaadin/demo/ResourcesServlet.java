package com.vaadin.demo;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;

// @WebServlet("/*")
public class ResourcesServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    System.out.println("resources");
    RequestDispatcher rd = getServletContext().getNamedDispatcher("default");
    HttpServletRequest wrapped = new HttpServletRequestWrapper(req) {
      public String getServletPath() {
        return "/public/";
      }
    };
    rd.forward(wrapped, resp);
  }
}
