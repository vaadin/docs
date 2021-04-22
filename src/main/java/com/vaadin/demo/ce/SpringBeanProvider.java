package com.vaadin.demo.ce;

import org.springframework.context.annotation.Bean;

import com.vaadin.collaborationengine.CollaborationEngineConfiguration;

public class SpringBeanProvider {

    // tag::spring-bean[]
    @Bean
    public CollaborationEngineConfiguration ceConfigBean() {
        CollaborationEngineConfiguration configuration = new CollaborationEngineConfiguration(
                licenseEvent -> {
                    // See <<ce.production.license-events>>
                });
        configuration.setDataDir("/Users/steve/vaadin/collaboration-engine/");
        return configuration;
    }
    // end::spring-bean[]

}
