package com.example.library_management_system.controllers;

import com.example.library_management_system.models.BorrowedBook;
import com.example.library_management_system.service.BorrowedBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Borrowed")
//@CrossOrigin(origins = "http://localhost:5173")
public class BorrowedBookController {

    @Autowired
    BorrowedBookService borrowedBookService;

    @PostMapping("/insert")
    public ResponseEntity<?> borrowBook(@RequestBody BorrowedBook borrowedBook) {
        try {
            BorrowedBook b = borrowedBookService.borrowBook(borrowedBook);
            return ResponseEntity.ok(b);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/return/{id}")
    public ResponseEntity<?> returnBook(@PathVariable Integer id) {
        try {
            BorrowedBook b = borrowedBookService.returnBook(id);
            return ResponseEntity.ok(b);
        } catch(Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BorrowedBook>> getAllBorrowed() {
        return ResponseEntity.ok(borrowedBookService.getAllBorrowed());
    }
}