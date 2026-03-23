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
    private String date_take;
    private String date_return;
    private Integer id_book;

    // Getteri i setteri
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getDate_take() { return date_take; }
    public void setDate_take(String date_take) { this.date_take = date_take; }

    public String getDate_return() { return date_return; }
    public void setDate_return(String date_return) { this.date_return = date_return; }

    public Integer getId_book() { return id_book; }
    public void setId_book(Integer id_book) { this.id_book = id_book; }
}