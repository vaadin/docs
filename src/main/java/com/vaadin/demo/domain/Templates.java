package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Templates {

  private String richTextDelta;

  public String getRichTextDelta() {
    return richTextDelta;
  }

  public void setRichTextDelta(String richTextDelta) {
    this.richTextDelta = richTextDelta;
  }

}
