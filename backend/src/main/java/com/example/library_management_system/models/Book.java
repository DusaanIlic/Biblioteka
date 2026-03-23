package com.example.library_management_system.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    private Integer id_book;
    private String title;
    private String author;
    private String release_date;
    private Integer quantity;

    // Konstruktor bez parametara
    public Book() {}

    // Konstruktor sa parametrima
    public Book(Integer id_book, String title, String author, String release_date, Integer quantity) {
        this.id_book = id_book;
        this.title = title;
        this.author = author;
        this.release_date = release_date;
        this.quantity = quantity;
    }

    // Getteri i setteri
    public Integer getId_book() { return id_book; }
    public void setId_book(Integer id_book) { this.id_book = id_book; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getRelease_date() { return release_date; }
    public void setRelease_date(String release_date) { this.release_date = release_date; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }
}