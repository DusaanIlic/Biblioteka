package com.example.library_management_system.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    private Integer id_book;
    private String title;
    private String author;
    private String release_date;
    private Integer quantity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BookStatus status = BookStatus.free;

    public Book() {}

    public Book(Integer id_book, String title, String author, String release_date, Integer quantity) {
        this.id_book = id_book;
        this.title = title;
        this.author = author;
        this.release_date = release_date;
        this.quantity = quantity;
    }

}