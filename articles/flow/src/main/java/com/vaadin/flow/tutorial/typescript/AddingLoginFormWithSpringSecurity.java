/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.typescript;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("typescript/adding-login-form-with-spring-security.asciidoc")
public class AddingLoginFormWithSpringSecurity {

    @EnableWebSecurity
    @Configuration
    public class SecurityConfig extends WebSecurityConfigurerAdapter {

      @Override
      protected void configure(HttpSecurity http) throws Exception {
        // Vaadin already handles csrf.
        http.csrf().disable();
        // Use default spring login form
        http.formLogin();
      } 

      @Override
      public void configure(WebSecurity web) {
        // Access to static resources, bypassing Spring security.
        web.ignoring().antMatchers("/VAADIN/**");
      }

      @Autowired
      private DataSource dataSource;
      
      @Override
      protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        // Configure users and roles in memory
        auth.inMemoryAuthentication()
            .withUser("user").password("{noop}user").roles("USER")
            .and()
            .withUser("admin").password("{noop}admin").roles("ADMIN", "USER");

        // Configure users and roles in a JDBC database  
        auth.jdbcAuthentication()
          .dataSource(dataSource)
          .usersByUsernameQuery(
             "SELECT username, password, enabled FROM users WHERE username=?")
          .authoritiesByUsernameQuery(
             "SELECT username, authority FROM from authorities WHERE username=?")
          .passwordEncoder(new BCryptPasswordEncoder());

        // Obtain users and roles from an LDAP service
        auth.ldapAuthentication()
            .userDnPatterns("uid={0},ou=people")
            .userSearchBase("ou=people")
            .groupSearchBase("ou=groups")
            .contextSource()
            .url("ldap://localhost:8389/dc=example,dc=com")
            .and()
            .passwordCompare()
            .passwordAttribute("userPassword");
      }
    }
}

