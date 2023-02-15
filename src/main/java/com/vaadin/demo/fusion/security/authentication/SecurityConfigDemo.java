package com.vaadin.demo.fusion.security.authentication;

import com.vaadin.flow.spring.security.VaadinWebSecurity;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;

/**
 * An example code for demoing the Spring Security configuration, shouldn't affect
 * the doc application itself.
 */
public class SecurityConfigDemo extends VaadinWebSecurity {

  // tag::login[]
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    super.configure(http);
    setLoginView(http, "/login");
  }
  // end::login[]

  @Bean
  public UserDetailsManager userDetailsService() {
    // Configure users and roles in memory
    return new InMemoryUserDetailsManager(
      // the {noop} prefix tells Spring that the password is not encoded
      User.withUsername("user").password("{noop}password").roles("USER").build()
    );
  }

  // tag::public-resources[]
  @Override
  public void configure(WebSecurity web) throws Exception {
      super.configure(web);
      web.ignoring().antMatchers("/images/**"); 
  }
  // end::public-resources[]
}
