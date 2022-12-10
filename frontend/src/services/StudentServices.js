import api from "../configs/api";

function getAllStudents(){
    return api.get("/students");
}

function getAllStudentsByPagination(size, page){
    return api.get(`/students?size=${size}&page=${page}`);
}

function getStudentById(id){
    return api.get(`/students/${id}`);
}

function createStudent(student){
    return api.post("/students", student);
}

function updateStudent(student){
    return api.put(`/students/${student.id}`, student);
}

function deleteStudent(id){
    return api.delete(`/students/${id}`);
}

const StudentServices = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent,
    getAllStudentsByPagination
}

export default StudentServices;