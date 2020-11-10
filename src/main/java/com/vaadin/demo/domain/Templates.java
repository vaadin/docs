package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Templates {

  private String richTextDelta;

  private String loremIpsum;

  public String getRichTextDelta() {
    return richTextDelta;
  }

  public void setRichTextDelta(String richTextDelta) {
    this.richTextDelta = richTextDelta;
  }

  public String getLoremIpsum() {
    return loremIpsum;
  }

  public void setLoremIpsum(String loremIpsum) {
    this.loremIpsum = loremIpsum;
  }

}
