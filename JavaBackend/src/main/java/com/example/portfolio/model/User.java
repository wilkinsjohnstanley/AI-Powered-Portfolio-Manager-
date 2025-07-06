/*

Model (aka Entity or Domain Model)

Purpose: Represents the data and business logic.

    Models are Java classes (often annotated with @Entity in Spring) that mirror database tables.

    Fields in the class map to columns in the database.

    Can contain business rules, validation logic, or helper methods.

*/
package com.example.portfolio.model;

public class User {
    private int id;
    private String username;
    private String email;


    //Constructors
    //Default constructor (required for Spring)
    public User(){}
    //All-args constructor
    public User(int id, String username, String email){
        this.id = id;
        this.username=username;
        this.email=email;
    }

    //Getters
    public int getId(){
        return id;
    }
    public String getUsername(){
        return username;
    }
    public String getEmail(){
        return email;
    }
    //Setters
    public void setId(int id){
        this.id = id;
    }
    public void setUsername(String username){
        this.username  = username;
    }
    public void setEmail(String email){
        this.email = email;
    }
    //Optional: toString
    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
