package com.xtramile.simpleapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.xtramile.simpleapp.models.Student;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long>{
    
}
