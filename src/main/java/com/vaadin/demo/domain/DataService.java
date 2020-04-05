package com.vaadin.demo.domain;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

public class DataService {

  public static List<Person> getPeople() {
    ObjectMapper mapper = new ObjectMapper();

    try {
      Resource peopleResource = new ClassPathResource("data/people.json");
      Person[] array = mapper.readValue(peopleResource.getInputStream(), Person[].class);
      return Arrays.asList(array);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  public static List<State> getStates() {
    ObjectMapper mapper = new ObjectMapper();

    try {
      Resource statesResource = new ClassPathResource("data/states.json");
      State[] array = mapper.readValue(statesResource.getInputStream(), State[].class);
      return Arrays.asList(array);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

  public static Templates getTemplates() {
    ObjectMapper mapper = new ObjectMapper();

    try {
      Resource templateResource = new ClassPathResource("data/templates.json");
      Templates templates = mapper.readValue(templateResource.getInputStream(), Templates.class);
      return templates;
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

}
