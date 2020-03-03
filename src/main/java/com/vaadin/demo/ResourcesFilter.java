package com.vaadin.demo;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebFilter("/*")
public class ResourcesFilter implements Filter {
  private FilterConfig filterConfig;

  @Override
  public void init(FilterConfig filterConfig) throws ServletException {
      this.filterConfig = filterConfig;
  }

  public void doFilter(ServletRequest req, ServletResponse res,
                         FilterChain chain)
            throws ServletException, IOException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        if (!request.getRequestURI().contains("connect")) {
          String uri = request.getRequestURI();
          if (uri.endsWith("/")) {
            uri = uri + "index.html";
          } else if (!uri.contains(".")) {
            uri = uri + "/index.html";
          }
          filterConfig.getServletContext().getRequestDispatcher(uri).forward(request, response);
        } else {
          chain.doFilter(request, response);
        }

    }
}
