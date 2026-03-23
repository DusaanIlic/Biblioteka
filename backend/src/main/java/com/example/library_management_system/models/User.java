package com.example.library_management_system.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    private Integer id_user;
    private String firstname;
    private String lastname;
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String user_type;

    // Konstruktor bez parametara
    public User() {}

    // Konstruktor sa parametrima
    public User(Integer id_user, String firstname, String lastname, String username, String password, String user_type) {
        this.id_user = id_user;
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.password = password;
        this.user_type = user_type;
    }

    // Getteri i setteri
    public Integer getId_user() { return id_user; }
    public void setId_user(Integer id_user) { this.id_user = id_user; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getUser_type() { return user_type; }
    public void setUser_type(String user_type) { this.user_type = user_type; }
}