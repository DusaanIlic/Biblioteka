package com.example.library_management_system.requests;

public class LoginRequest {
    private String username;
    private String password;

    // Konstruktor bez parametara
    public LoginRequest() {}

    // Konstruktor sa parametrima
    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    // Getteri i setteri
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}