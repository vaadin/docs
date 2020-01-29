package com.vaadin.demo.domain;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

public class DataService {

  public static List<Person> getPeople() {
    ObjectMapper mapper = new ObjectMapper();

    try {
      String projectPath = System.getProperty("user.dir");
      Person[] array = mapper.readValue(new File(projectPath + "/frontend/data/people.json"), Person[].class);
      return Arrays.asList(array);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

}
