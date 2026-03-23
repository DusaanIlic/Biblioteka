package com.example.library_management_system.requests;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BookSearchPayload {
    private String title;
    private String author;

    public BookSearchPayload() {}

    public BookSearchPayload(String title, String author) {
        this.title = title;
        this.author = author;
    }

}