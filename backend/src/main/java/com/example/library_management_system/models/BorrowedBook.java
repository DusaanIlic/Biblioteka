package com.example.library_management_system.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
@Entity
@Table(name = "borrowed_books")
public class BorrowedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstname;
    private String lastname;

    @Column(name = "date_take")
    private String dateTake;

    @Column(name = "date_return")
    private String dateReturn;

    @Column(name = "id_book")
    private Integer idBook;

    @ManyToOne
    @JoinColumn(name = "id_book", insertable = false, updatable = false)
    private Book book;
}