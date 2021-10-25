package com.vaadin.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;

/**
 * The entry point of the Spring Boot application.
 */
@SpringBootApplication
@ServletComponentScan
@ComponentScan(excludeFilters = {@ComponentScan.Filter(type =
        FilterType.ANNOTATION, value = ExcludeDemoSpringComponent.class)})
public class Application extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
