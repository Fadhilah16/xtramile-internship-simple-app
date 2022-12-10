import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentServices from "../../services/StudentServices";

export const getAllStudents = createAsyncThunk("student/getAllStudents", async (_, {rejectWithValue}) => {
    try{
            const {data} = await StudentServices.getAllStudents();
            return data;
    }catch (e){
        return rejectWithValue(e.response.data);
    }
    

});

export const getAllStudentsByPagination = createAsyncThunk("student/getAllStudentsByPagination", async ({page, size},{rejectWithValue})=>{

    try{      
            const {data} = await StudentServices.getAllStudentsByPagination(size, page-1);
            return data;
    }catch (e){
        return rejectWithValue(e.response.data);
    }

})

export const getStudentById = createAsyncThunk("student/getStudentById", async ({id},{rejectWithValue}) => {
    try{
        const {data} = await StudentServices.getStudentById(id);
        return data;
    }catch (e){
        return rejectWithValue(e.response.data);
    }
});

export const createStudent = createAsyncThunk("student/createStudent", async ({student}, {rejectWithValue}) => {
    try{
        const {data} = await StudentServices.createStudent(student);
        return data;
    }catch (e){
        return rejectWithValue( e.response.data);
    }
});

export const updateStudent = createAsyncThunk("student/createStudent", async ({student}, {rejectWithValue}) => {
    try{
        const {data} = await StudentServices.updateStudent(student);
        return data;
    }catch (e){
        return rejectWithValue(e.response.data);
    }
});

export const deleteStudent = createAsyncThunk("student/deleteStudent", async ({id}, {rejectWithValue}) => {
    try{
        await StudentServices.deleteStudent(id);
        return {id};
    }catch (e){
        return rejectWithValue(e.response.data);
    }
});


const studentSlice = createSlice({
    name : "student",
    initialState : {
        student : {},
        students : [],
        paginateStudents: [],
        loading : false,
        success: false,
        error : {},
        successRetrieve:false,
        size : -1,
        currentPage : 1,
        scrollX: 0,
        scrollY: 0
    },
    reducers:{
        setSize:(state, action) =>{
            state.size = action.payload;
        },
        setCurrentPage:(state, action) =>{
            state.currentPage = action.payload;
        },
        setScrollPosition:(state, action) => {
            state.scrollX = action.payload.scrollX;
            state.scrollY = action.payload.scrollY;
        }
    },
    extraReducers:{
        [getAllStudents.pending] : (state, action) =>{
            state.loading = true;
            state.successRetrieve = false;
        },
        [getAllStudents.fulfilled] : (state, action) => {
            state.loading = false;
            state.students = action.payload;
            state.successRetrieve = true;
        },
        [getAllStudents.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successRetrieve = false;
        },
        [getAllStudentsByPagination.pending] : (state, action) =>{
            state.loading = true;
            state.successRetrieve = false;
        },
        [getAllStudentsByPagination.fulfilled] : (state, action) => {
            state.loading = false;
            state.paginateStudents = action.payload;
            state.successRetrieve = true;
        },
        [getAllStudentsByPagination.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.successRetrieve = false;
        },
        [getStudentById.pending] : (state, action) =>{
            state.loading = true;
            state.success = false;
        },
        [getStudentById.fulfilled] : (state, action) => {
            state.loading = false;
            state.student = action.payload;
            state.success = true;
        },
        [getStudentById.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        [createStudent.pending] : (state, action) =>{
            state.loading = true;
            state.success = false;
        },
        [createStudent.fulfilled] : (state, action) => {
            state.loading = false;
            state.students = state.student.push(action.payload);
            state.paginateStudents = state.students;
            state.success = true;
        },
        [createStudent.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        [updateStudent.pending] : (state, action) =>{
            state.loading = true;
            state.success = false;
        },
        [updateStudent.fulfilled] : (state, action) => {
            state.loading = false;
            const index = state.students.findIndex(student => student.id === action.payload.id);
            state.students[index] = {
                ...state.students[index],
                ...action.payload,
            };
            state.student = action.payload;
            state.success = true;
        },
        [updateStudent.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        [deleteStudent.pending] : (state, action) =>{
            state.loading = true;
            state.success = false;
        },
        [deleteStudent.fulfilled] : (state, action) => {
            state.loading = false;
            state.students = state.students.filter(student => student.id !== action.payload.id);
            state.paginateStudents = state.paginateStudents.filter(student => student.id !== action.payload.id);
            state.success = true;
        },
        [deleteStudent.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        }
        
        
    }
});


const {reducer} = studentSlice;
export const {setSize, setCurrentPage, setScrollPosition} = studentSlice.actions
export default reducer;