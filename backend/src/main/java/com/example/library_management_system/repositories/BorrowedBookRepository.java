package com.example.library_management_system.repositories;

import com.example.library_management_system.models.BorrowedBook;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowedBookRepository extends JpaRepository<BorrowedBook, Integer> {
    List<BorrowedBook> findByIdBookAndDateReturnIsNull(Integer id_book);
    List<BorrowedBook> findByDateReturnIsNull();
}