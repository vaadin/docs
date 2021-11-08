package com.vaadin.demo.component.grid;

import com.vaadin.demo.domain.Person;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.concurrent.ThreadLocalRandom;

class PersonWithRating extends Person {

    private static final DecimalFormat decimalFormat = new DecimalFormat(
            "0.00");

    static {
        DecimalFormatSymbols symbols = new DecimalFormatSymbols();
        symbols.setDecimalSeparator('.');
        decimalFormat.setDecimalFormatSymbols(symbols);
    }

    private double rating;

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public String getFormattedRating() {
        return decimalFormat.format(rating);
    }

    public static PersonWithRating generateFromPerson(Person person) {
        PersonWithRating result = new PersonWithRating();
        result.setFirstName(person.getFirstName());
        result.setLastName(person.getLastName());
        result.setEmail(person.getEmail());
        result.setBirthday(person.getBirthday());
        result.setId(person.getId());
        result.setSubscriber(person.isSubscriber());
        result.setMembership(person.getMembership());
        result.setPictureUrl(person.getPictureUrl());
        result.setProfession(person.getProfession());
        result.setAddress(person.getAddress());
        result.setManagerId(person.getManagerId());
        result.setManager(person.isManager());
        result.setStatus(person.getStatus());

        double rating = ThreadLocalRandom.current().nextDouble(0, 10);
        result.setRating(rating);

        return result;
    }
}
