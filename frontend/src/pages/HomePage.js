import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import List from "../components/List";
import { getAllStudents, getAllStudentsByPagination, setCurrentPage, setSize } from "../store/slices/studentSlice";
import Toast from 'react-bootstrap/Toast';
import Form from 'react-bootstrap/Form';
import PaginationComponent from "../components/PaginationComponent";

export default function HomePage(){

    const {paginateStudents, students, loading, success, error, successRetrieve, scrollX, scrollY} = useSelector(state => ({...state.student}));
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const {size, currentPage} = useSelector((state) => ({...state.student}));

    useEffect(() => {
        if (size < 0){
            dispatch(getAllStudents());
        }else{
            dispatch(getAllStudentsByPagination({size:size,page:currentPage}));
        }
        

    },[dispatch, size, currentPage, scrollX, scrollY]);

    const spinner = (<div className="d-flex justify-content-center">
                        <Spinner className="" animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>);

    const navigate = useNavigate();

    function changePage(){
           navigate("create") ;

    }

    const toggleShowToast = () => {
        setShowToast(!showToast);
        setDeleted(!deleted);
     };

    const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

    function toastFunction(title, body, textColor){
        return (
            <div style={{position: "relative", zIndex:999}} className="d-flex justify-content-center">
            <Toast style={{position: "absolute"}} show={showToast} onClose={toggleShowToast}>
              <Toast.Header>
                <strong className="me-auto" style={{color: textColor}}>{title}</strong>
              </Toast.Header>
              <Toast.Body>{body}</Toast.Body>
            </Toast>
            </div>
        );
    }

    return (
        <Container className="mt-5">
            {(success && !loading && deleted) ? toastFunction("Success", "Student deleted successfully.","green") :  toastFunction("Failed", error.message,"red")}
            {(error && !successRetrieve && !loading) && toastFunction("Failed", error.message,"red")}
            <Row  className="justify-content-md-center">
                <Col xs={5}>
                    <Row className="d-flex">
                        <Col>
                            <Button className="mb-2" variant="primary" size="md" onClick={changePage}>
                            create <FontAwesomeIcon icon={faAdd}/>
                            </Button>
                        </Col>
                        <Col xs={2}>
                            <Form.Select className="justify-content-end" size="sm" controlId="sizeSelect" value={size} onChange={(e)=>{dispatch(setSize(e.target.value)); dispatch(setCurrentPage(1));}}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="-1">all</option>
                            </Form.Select>
                        </Col>
                    </Row>
                   
                    {!loading?(<List students={size < 0?students:paginateStudents} toggleShowToast={toggleShowToast} setDeleted={setDeleted}/>) : spinner}
                    <div className="d-flex justify-content-end">
                     <PaginationComponent size={size} totalData={students.length} paginate={paginate} currentPage={currentPage}/>
                    </div>
                </Col>
                
            </Row>
           
        </Container>
    );
}