package com.example.library_management_system.service;

import com.example.library_management_system.models.Book;
import com.example.library_management_system.models.BorrowedBook;
import com.example.library_management_system.repositories.BookRepository;
import com.example.library_management_system.repositories.BorrowedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BorrowedBookService {

    @Autowired
    BorrowedBookRepository borrowedBookRepository;

    @Autowired
    BookRepository bookRepository;

    public BorrowedBook borrowBook(BorrowedBook borrowedBook) throws Exception {
        // Provera da li je knjiga slobodna
        Optional<Book> bookOpt = bookRepository.findById(borrowedBook.getId_book());
        if(bookOpt.isEmpty()) throw new Exception("Book not found");

        Book book = bookOpt.get();
        if("loaned".equals(book.getStatus())) throw new Exception("Book already loaned");

        // Update status knjige
        book.setStatus("loaned");
        bookRepository.save(book);

        // Insert u borrowed_books
        return borrowedBookRepository.save(borrowedBook);
    }

    public BorrowedBook returnBook(Integer borrowedBookId, String returnDate) throws Exception {
        Optional<BorrowedBook> borrowOpt = borrowedBookRepository.findById(borrowedBookId);
        if(borrowOpt.isEmpty()) throw new Exception("Borrow record not found");

        BorrowedBook borrowedBook = borrowOpt.get();
        borrowedBook.setDate_return(returnDate);
        borrowedBookRepository.save(borrowedBook);

        // Update status knjige na free
        Optional<Book> bookOpt = bookRepository.findById(borrowedBook.getId_book());
        if(bookOpt.isPresent()) {
            Book book = bookOpt.get();
            book.setStatus("free");
            bookRepository.save(book);
        }

        return borrowedBook;
    }

    public List<BorrowedBook> getAllBorrowed() {
        return borrowedBookRepository.findByDate_returnIsNull();
    }
}