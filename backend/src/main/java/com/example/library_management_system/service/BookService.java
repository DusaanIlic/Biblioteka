package com.example.library_management_system.service;

import com.example.library_management_system.models.Book;
import com.example.library_management_system.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    public Book insert(Book book) {
        return bookRepository.save(book);
    }
    public Optional<Book> byId(Integer id_book) {
        return bookRepository.findById(id_book);
    }

    public Book update(Book book) {
        return bookRepository.save(book);
    }

    public List<Book> search(Specification<Book> specification) {
        return bookRepository.findAll(specification);
    }

    public void delete(Integer id_book) {
        bookRepository.deleteById(id_book);
    }
}
