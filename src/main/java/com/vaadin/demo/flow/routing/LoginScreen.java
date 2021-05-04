package com.vaadin.demo.flow.routing;

import com.vaadin.demo.DemoExporter;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.login.LoginForm;

@com.vaadin.flow.router.Route("routing-basic") // hidden-source-line
// tag::routing-basic[]
@Route("/login")
public class LoginScreen extends Div {
	public LoginScreen() {
        LoginForm loginForm = new LoginForm();
        // Implementation details omitted
        add(loginForm);
	}
	// end::routing-basic[]

	public static class RoutingBasicExporter extends DemoExporter<LoginScreen> { // hidden-source-line
	} // hidden-source-line
	// tag::routing-basic[]
}
// end::routing-basic[]
