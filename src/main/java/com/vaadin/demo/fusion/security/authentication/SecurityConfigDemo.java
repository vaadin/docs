package com.vaadin.demo.fusion.security.authentication;

import com.vaadin.flow.spring.security.VaadinWebSecurityConfigurerAdapter;

import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;

/**
 * An example code for demoing the Spring Security configuration, shouldn't affect
 * the doc application itself.
 */
public class SecurityConfigDemo extends VaadinWebSecurityConfigurerAdapter {

  // tag::login[]
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);
    setLoginView(http, "/login");
  }
  // end::login[]

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    // Configure users and roles in memory
    auth.inMemoryAuthentication().withUser("user").password("{noop}password").roles("USER");
  }

  // tag::public-resources[]
  @Override
  public void configure(WebSecurity web) throws Exception {
      super.configure(web);
      web.ignoring().antMatchers("/images/**"); 
  }
  // end::public-resources[]
}
