package com.vaadin.demo.domain;

import java.io.File;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.util.ResourceUtils;

public class DataService {

  public static List<Person> getPeople() {
    ObjectMapper mapper = new ObjectMapper();

    try {
      Person[] array = mapper.readValue(ResourceUtils.getFile("classpath:data/people.json"), Person[].class);
      return Arrays.asList(array);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return null;
  }

}
