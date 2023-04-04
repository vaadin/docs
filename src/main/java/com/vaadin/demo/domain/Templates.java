package com.vaadin.demo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Templates {

    private String richTextHtml;

    private String loremIpsum;

    public String getRichTextHtml() {
        return richTextHtml;
    }

    public void setRichTextHtml(String richTextHtml) {
        this.richTextHtml = richTextHtml;
    }

    public String getLoremIpsum() {
        return loremIpsum;
    }

    public void setLoremIpsum(String loremIpsum) {
        this.loremIpsum = loremIpsum;
    }

}
