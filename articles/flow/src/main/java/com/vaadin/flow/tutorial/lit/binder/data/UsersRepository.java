package com.vaadin.flow.tutorial.lit.binder.data;

import java.util.List;
import java.util.Vector;

import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("polymer-templates/tutorial-template-and-binder.asciidoc")
/**
 * Repository of users. It is use to work with users locally.
 */
public class UsersRepository {

    private static List<User> users;

    static {
        // Vector is a thread safe version of ArrayList
        users = new Vector<>();
    }

    /**
     * Gets all the users.
     *
     * @return users list of users
     */
    public static List<User> getUsers(){
        return users;
    }

    /**
     * Saves a user.
     *
     * @param user user
     * @return user saved user
     */
    public static User save(User user){
        int index = users.indexOf(user);
        if ( index >= 0){
            users.set(index,user);
        }else{
            users.add(user);
        }
        return user;
    }

    /**
     * Deletes a user.
     *
     * @param user user
     */
    public static void delete(User user){
        users.remove(user);
    }
}
