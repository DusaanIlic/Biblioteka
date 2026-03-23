package com.example.library_management_system.service;

import com.example.library_management_system.models.Book;
import com.example.library_management_system.models.BookStatus;
import com.example.library_management_system.models.BorrowedBook;
import com.example.library_management_system.repositories.BookRepository;
import com.example.library_management_system.repositories.BorrowedBookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowedBookService {

    @Autowired
    BorrowedBookRepository borrowedBookRepository;

    @Autowired
    BookRepository bookRepository;

    public BorrowedBook borrowBook(BorrowedBook borrowedBook) throws Exception {
        Optional<Book> bookOpt = bookRepository.findById(borrowedBook.getId_book());
        if(bookOpt.isEmpty()) throw new Exception("Book not found");

        Book book = bookOpt.get();
        if(book.getQuantity() <= 0) throw new Exception("Book not available");

        book.setQuantity(book.getQuantity() - 1);

        if(book.getQuantity() == 0) {
            book.setStatus(BookStatus.loaned);
        }

        bookRepository.save(book);

        borrowedBook.setDateTake(LocalDate.now());

        return borrowedBookRepository.save(borrowedBook);
    }

    public BorrowedBook returnBook(Integer borrowedBookId) throws Exception {
        Optional<BorrowedBook> borrowOpt = borrowedBookRepository.findById(borrowedBookId);
        if(borrowOpt.isEmpty()) throw new Exception("Borrow record not found");

        BorrowedBook borrowedBook = borrowOpt.get();
        borrowedBook.setDateReturn(LocalDate.now());
        borrowedBookRepository.save(borrowedBook);

        Optional<Book> bookOpt = bookRepository.findById(borrowedBook.getId_book());
        if(bookOpt.isPresent()) {
            Book book = bookOpt.get();
            book.setQuantity(book.getQuantity() + 1);
            book.setStatus(BookStatus.free);
            bookRepository.save(book);
        }

        return borrowedBook;
    }

    public List<BorrowedBook> getAllBorrowed() {
        return borrowedBookRepository.findByDateReturnIsNull();
    }
}