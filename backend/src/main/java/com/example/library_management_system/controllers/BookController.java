package com.example.library_management_system.controllers;

import com.example.library_management_system.models.Book;
import com.example.library_management_system.requests.BookSearchPayload;
import com.example.library_management_system.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/Book")
@CrossOrigin(origins = "http://localhost:5173")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        // Ako lista postoji, vrati OK sa JSON nizom
        return ResponseEntity.ok(books);
    }

    @PostMapping("/insert")
    public Book insert(@RequestBody Book book) {
        return bookService.insert(book);
    }

    private Specification<Book> likeFilter(String fieldName, String value) {
        if(value == null || value.isEmpty()) {
            return null;
        }

        return ((root, query, criteriaBuilder) ->
                criteriaBuilder.like(root.get(fieldName), "%" + value + "%"));
    }

    private Specification<Book> buildSpecification(BookSearchPayload payload) {
        Specification<Book> spec = Specification.where(null);

        if (payload.getTitle() != null && !payload.getTitle().isEmpty()) {
            spec = spec.and(likeFilter("title", payload.getTitle()));
        }

        if (payload.getAuthor() != null && !payload.getAuthor().isEmpty()) {
            spec = spec.and(likeFilter("author", payload.getAuthor()));
        }

        return spec;
    }

    @PostMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestBody BookSearchPayload bookSearchPayload) {
        Specification<Book> specification = buildSpecification(bookSearchPayload);
        List<Book> books = bookService.search(specification);
        if(books == null || books.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(books);
    }

    @GetMapping("/{id_book}")
    public Optional<Book> byId(@PathVariable Integer id_book) {
        return bookService.byId(id_book);
    }

    @PutMapping("/{id_book}")
    public ResponseEntity<Book> update(@PathVariable Integer id_book, @RequestBody Book bookToUpdate) {
        Optional<Book> existingBook = bookService.byId(id_book);

        if(existingBook.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = existingBook.get();
        book.setTitle(bookToUpdate.getTitle());
        book.setAuthor(bookToUpdate.getAuthor());
        book.setSerial_number(bookToUpdate.getSerial_number());
        book.setQuantity(bookToUpdate.getQuantity());

        Book savedBook = bookService.update(book);

        return ResponseEntity.ok(savedBook);
    }

    @DeleteMapping("/{id_book}")
    public ResponseEntity<Void> delete(@PathVariable Integer id_book) {
        bookService.delete(id_book);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
