import { faEdit, faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteStudent, setScrollPosition } from "../store/slices/studentSlice";

export default function StudentCard({student, toggleShowToast, setDeleted}) {

    var today =  Date.now();
    var birthDate = new Date(student.birthDate);
    var ageDifMs =  today - birthDate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    const dispatch = useDispatch();
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    function deleteHandler(id){

        dispatch(deleteStudent({id}));
        handleClose();
        setDeleted(true);
        toggleShowToast();
        
    }

    return (
        <Card className="mb-1">
            <Card.Body>
                <Row>
                    <Col xs={12} md={8}>

                           <Row>
                            <Col xs={5} md={4}>
                            <h6 className="text-muted">ID</h6>
                            </Col>
                            <Col>
                            <h6>{student.id}</h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={5} md={4}>
                            <h6 className="text-muted">Full Name</h6>
                            </Col>
                            <Col>
                            <h6>{student.firstName +" "+ (student.lastName?student.lastName:"")}</h6>
                            </Col>
                        </Row>
                        <Row >
                            <Col xs={5} md={4}>
                            <h6 className="text-muted">Age</h6>
                            </Col>
                            <Col>
                            <h6>{age} years</h6>
                            </Col>
                        </Row>
                        
                    </Col>
                    <Col xs={6} md={4} >
                      
                            <div className="d-flex justify-content-end align-items-center">
                                <Button variant="info" size="sm" className="mx-1" onClick={()=> { dispatch(setScrollPosition(({scrollX: window.scrollX, scrollY: window.scrollY }))); navigate(`details/${student.id}`);}}>
                                    <FontAwesomeIcon icon={faEye}/>
                                </Button>
                                <Button variant="success" size="sm" className="mx-1" onClick={()=> { dispatch(setScrollPosition(({scrollX: window.scrollX, scrollY: window.scrollY }))); navigate(`edit/${student.id}`)}}>
                                    <FontAwesomeIcon icon={faEdit}/>
                                </Button>
                                <Button variant="danger" size="sm" className="mx-1" onClick={handleShow}><FontAwesomeIcon icon={faTrash} /></Button>
                                 <Modal
                                    show={modalShow}
                                    onHide={handleClose}
                                    backdrop="static"
                                    keyboard={false}
                                    >
                                    <Modal.Header closeButton>
                                        <Modal.Title>Delete Student</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                       Are you sure to delete this student?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Cancel
                                        </Button>
                                        <Button variant="danger" onClick={()=>deleteHandler(student.id)}>Delete</Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                    </Col>
                </Row>

            </Card.Body>
        </Card>
    )
}

