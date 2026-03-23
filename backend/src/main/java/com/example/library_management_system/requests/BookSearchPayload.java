package com.example.library_management_system.requests;

public class BookSearchPayload {
    private String title;
    private String author;

    public BookSearchPayload() {}

    public BookSearchPayload(String title, String author) {
        this.title = title;
        this.author = author;
    }

    // Getteri i setteri
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}