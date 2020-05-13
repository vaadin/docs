/*
 * Copyright 2000-2018 Vaadin Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
package com.vaadin.flow.tutorial.typescript;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreType;
import com.fasterxml.jackson.annotation.JsonProperty;

import com.vaadin.flow.server.connect.Endpoint;
import com.vaadin.flow.tutorial.annotations.CodeFor;

@CodeFor("typescript/custom-serialization.asciidoc")
public class CustomSerialization {
    
    private static class StudentRating {
        public static int getRatingFor(String name) {
            return 1;
        }
    }

    public class Student {
        @JsonProperty("bookId")
        private String id;
        private String name;

        @JsonProperty("name")
        public void setFirstName(String name) {
            this.name = name;
        }
        
        @JsonProperty("name")
        public String getFirstName() {
            return name;
        }        
        
        @JsonProperty
        public int getRating() {
            return StudentRating.getRatingFor(name);
        }
    }

    @JsonIgnoreProperties(value = { "id"}, allowGetters = true)
    public class Product {
       private String id;
       private String name;

       @JsonIgnore
       private String category; 

       @JsonIgnore
       public String getCategory() {
         return category;
       }

       @JsonIgnore
       public void setCategory(String category) {
          this.category = category;
       }
    }    
    
    @JsonIgnoreProperties(value = { "password"})
    public class Account {
       private String name;
       private String password;
       
       public String getName() {
           return name;
       }
       
       public String getPassword() {
           return password;
       }       
    }

    @JsonIgnoreProperties(value = { "password"}, allowSetters = true)
    public class User {
       private String name;
       private String password;

    }
    
    @JsonIgnoreType
    public class Client {
    }

    @JsonIgnoreProperties(value = { "password"}, allowSetters = true)
    public class Sale {
        private Client client;

        private Product product;
        private int ammount;
        private double total;
    }

}
