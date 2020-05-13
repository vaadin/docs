package com.vaadin.flow.tutorial.embeddingflowapplications;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("embedding-flow-applications/tutorial-webcomponent-exporter.asciidoc")
@WebServlet(urlPatterns = {"/example"})
public class MainAppServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");

        Object authToken = req.getSession().getAttribute("auth_token");
        boolean isAuthenticated = authToken != null;

        try (PrintWriter out = response.getWriter()) {
            out.println("<!DOCTYPE html>");
            out.println("<html><head>");
            out.println("<meta http-equiv='Content-Type' content='text/html; "
                    + "charset=UTF-8'>");

            if (!isAuthenticated) {
                out.println("<script type='text/javascript' "
                        + "src='/vaadin/VAADIN/build/webcomponentsjs/"
                        + "webcomponents-loader.js'></script>");
                out.println("<script type='module' src='/vaadin/web-component"
                        + "/login-form.js'></script>");
                out.println("<script type='text/javascript' "
                        + "src='/log-in.js' defer></script>");
            }
            out.println("</head><body>");
            if (isAuthenticated) {
                out.println("<h1>Welcome "
                        + UserService.getInstance().getName(authToken)
                        + "</h1>");
            } else {
                out.println("<login-form userlbl='Username' pwdlbl='Password'>"
                        + "</login-form>");
            }
            out.println("</body>");
            out.println("</html>");
        }
    }
}
