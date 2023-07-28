package com.vaadin.demo.domain;

import java.util.List;

import com.vaadin.flow.spring.annotation.SpringComponent;

/**
 * User entity class used in documentation examples.
 */
public class User {

    @SpringComponent
    public static class UserService {
        public User getCurrentUser() {
            return new User();
        }

        public User findById(String id) {
            return new User();
        }
    }

    private String id;
    private String name;
    private String imageUrl;
    private byte[] image;
    private List<Role> roles;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
