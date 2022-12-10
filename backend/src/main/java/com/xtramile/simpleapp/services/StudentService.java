package com.xtramile.simpleapp.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.xtramile.simpleapp.models.Student;
import com.xtramile.simpleapp.repositories.StudentRepo;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class StudentService {
    private StudentRepo studentRepo;

    public Student createStudent(Student student){
        student.setFirstName(student.getFirstName().trim());
        student.setLastName(student.getLastName().trim());
        student.setCreatedAt(new Date());
        student.setUpdatedAt(new Date());
        return studentRepo.save(student);
    }

    public Student updateStudent(Long id, Student student){
        Optional<Student> studentOptional = studentRepo.findById(id);
        student.setId(id);
        student.setFirstName(student.getFirstName().trim());
        student.setLastName(student.getLastName().trim());
        student.setCreatedAt(studentOptional.get().getCreatedAt());
        student.setUpdatedAt(new Date());
        return studentRepo.save(student);
    }

    public Iterable<Student> findAllStudents(){
        return studentRepo.findAll();
    }

    public Page<Student> findAllStudents(Pageable pageable){
        return studentRepo.findAll(pageable);
    }

    public Student findStudentById(Long id){
        return studentRepo.findById(id).get();
        
    }
    
    public void deleteStudentById(Long id){
        studentRepo.deleteById(id);
    }
}
