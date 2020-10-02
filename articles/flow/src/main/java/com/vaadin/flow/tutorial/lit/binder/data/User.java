package com.vaadin.flow.tutorial.lit.binder.data;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
/**
 * Class that represents users in the system.
 */
public class User {

    private String email;
    private String firstName;
    private String lastName;
    private String comment;

    /**
     *
     * User's constructor that initializes a new user.
     *
     * @param email email
     * @param firstName first name
     * @param lastName last name
     * @param comment comment about the user
     */
    public User(String email, String firstName, String lastName, String comment) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.comment = comment;
    }

    /**
     * Gets the email of a user.
     *
     * @return email email of a user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of a user.
     *
     * @param email email of a user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the first name of a user.
     *
     * @return firstName first name of a user
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Sets the first name of a user.
     *
     * @param firstName first name of a user
     */
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Gets the last name of a user.
     *
     * @return lastName last name of a use
     */
    public String getLastName() {
        return lastName;
    }

    /**
     * Sets the last name of a user.
     *
     * @param lastName last name of a user
     */
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    /**
     * Gets the comment associated with a user.
     *
     * @return comment comment
     */
    public String getComment() {
        return comment;
    }

    /**
     * Sets the comments for a user.
     *
     * @param comment comment
     */
    public void setComment(String comment) {
        this.comment = comment;
    }


    /**
     * toString method
     *
     * @return user String that represents the User.
     */
    @Override
    public String toString() {
        return "User{" +
                "email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", comment='" + comment + '\'' +
                '}';
    }
}
