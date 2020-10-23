package com.vaadin.demo.domain;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.core.io.ClassPathResource;

public class DataService {

  public static <T> T getItems(Class<T> clazz, String dataFileName) {
    ObjectMapper mapper = new ObjectMapper();
    try {
      InputStream stream = new ClassPathResource("data/" + dataFileName).getInputStream();
      return mapper.readValue(stream, clazz);
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public static List<Person> getPeople() {
    return Arrays.asList(getItems(Person[].class, "people.json"));
  }

  public static List<State> getStates() {
    return Arrays.asList(getItems(State[].class, "states.json"));
  }

  public static Templates getTemplates() {
    return getItems(Templates.class, "templates.json");
  }

  public static List<Card> getCards() {
    return Arrays.asList(getItems(Card[].class, "cards.json"));
  }

}
