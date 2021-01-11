package com.vaadin.demo.fusion.forms;

/**
 * Contact card with base64-encoded image
 */
public class Contact {
  // other contact fields: name, address, phone, ...

  private String avatarBase64;

  public String getAvatarBase64() {
      return avatarBase64;
  }

  public void setAvatarBase64(String avatarBase64) {
      this.avatarBase64 = avatarBase64;
  }
}
