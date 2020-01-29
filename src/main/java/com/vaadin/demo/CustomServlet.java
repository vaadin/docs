package com.vaadin.demo;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletResponse;

import com.vaadin.flow.server.VaadinServlet;

@WebServlet(urlPatterns = {"/*"})
public class CustomServlet extends VaadinServlet {

  @Override
  public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
      setAccessControlHeaders((HttpServletResponse) res);
      super.service(req, res);
  }

  private void setAccessControlHeaders(HttpServletResponse resp) {
      resp.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
      resp.setHeader("Access-Control-Allow-Methods", "*");
      resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
      resp.setHeader("Access-Control-Allow-Credentials", "true");
  }
}
