package com.xtramile.simpleapp.controllers;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.xtramile.simpleapp.dtos.ResponseDto;
import com.xtramile.simpleapp.models.Student;
import com.xtramile.simpleapp.services.StudentService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/students")
@AllArgsConstructor
@CrossOrigin
public class StudentController {
    
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<?> createStudent(@Valid @RequestBody Student student, Errors errors){

        try{
            ResponseDto response = new ResponseDto();
            if(errors.hasErrors()){
                for (ObjectError error : errors.getAllErrors()) {
                    System.out.println(error.getDefaultMessage());
                    response.getMessages().add(error.getDefaultMessage());
                }
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(studentService.createStudent(student));
        }catch(Exception e){
            throw new RuntimeException("Failed to create data because " + e.getMessage().toString().toLowerCase());
        }
       

    }   

    @PutMapping("/{id}")
    public ResponseEntity<?> updateStudent(@PathVariable("id") Long id, @Valid @RequestBody Student student, Errors errors){
        try {
            ResponseDto response = new ResponseDto();
            if(errors.hasErrors()){
                for (ObjectError error : errors.getAllErrors()) {
                    System.out.println(error.getDefaultMessage());
                    response.getMessages().add(error.getDefaultMessage());
                }
                response.setStatus(HttpStatus.BAD_REQUEST.value());
                
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            return ResponseEntity.ok(studentService.updateStudent(id, student));
        } catch (Exception e) {
            throw new RuntimeException("Failed to update data because " + e.getMessage().toString().toLowerCase());
        }
       
 
    }

    @GetMapping
    public Iterable<Student> findAllStudents(@RequestParam(required = false) Integer page, @RequestParam(required = false) Integer size){
        try {
            if (page == null || size == null){
                return studentService.findAllStudents();
            }else{
                Pageable pageable = PageRequest.of(page, size);
            
                return studentService.findAllStudents(pageable).toList();
            }

        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve data because " + e.getMessage().toString().toLowerCase());
        }
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<Student> findStudent(@PathVariable("id") Long id){
        try {
            return ResponseEntity.ok(studentService.findStudentById(id));
        } catch (Exception e) {
            throw new RuntimeException("Failed to get data because " + e.getMessage().toString().toLowerCase());
        }
       
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable("id") Long id){
        try {
            studentService.deleteStudentById(id);
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete data because " + e.getMessage().toString().toLowerCase());
        }

        
    }
}
