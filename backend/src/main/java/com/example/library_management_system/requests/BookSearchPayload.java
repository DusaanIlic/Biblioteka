package com.example.library_management_system.requests;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookSearchPayload {
    private String title;
    private String author;
    private Integer quantity;
    private LocalDate releaseDate;

    public String getTitle() {
        return title;
    }
}


