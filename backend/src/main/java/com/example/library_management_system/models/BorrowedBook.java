package com.example.library_management_system.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "borrowed_books")
public class BorrowedBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String firstname;
    private String lastname;
    private LocalDate dateTake;
    private LocalDate dateReturn;
    private Integer idBook;

    // Getteri i setteri
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public LocalDate getDateTake() { return dateTake; }
    public void setDateTake(LocalDate date_take) { this.dateTake = date_take; }

    public LocalDate getDateReturn() { return dateReturn; }
    public void setDateReturn(LocalDate date_return) { this.dateReturn = date_return; }

    public Integer getId_book() { return idBook; }
    public void setId_book(Integer id_book) { this.idBook = id_book; }
}