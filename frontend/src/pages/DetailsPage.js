import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById } from '../store/slices/studentSlice';

export default function DetailsPage(){

    const navigate = useNavigate();
   
    const dispatch = useDispatch();
    const {student, success, loading, error} = useSelector(state=> ({...state.student}));
    const {id} = useParams();
    
    useEffect(()=>{
        dispatch(getStudentById({id}));
    
    },[dispatch, id])

    var today =  Date.now();
    var birthDate = new Date(student.birthDate);
    var ageDifMs =  today - birthDate.getTime();
    var ageDate = new Date(ageDifMs);
    var age = Math.abs(ageDate.getUTCFullYear() - 1970);

    const spinner =   (<div style={{position: "relative", zIndex: 999}} className="d-flex justify-content-center">
                            <Spinner style={{position: "absolute"}} className="" animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>);


    function backHandler(){
        navigate(-1);

    }

    return (
        <Container className="mt-5">
            {!success && error && !loading && navigate("/")}
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    <Button className="mb-2" variant="dark" size="sm" onClick={backHandler}><FontAwesomeIcon icon={faArrowLeft}/> Back</Button>
                    <Card>
                        <Card.Title className="d-flex justify-content-center mt-3">Student Details</Card.Title>
                        <Card.Body>
                    {loading && spinner}
                        <div className="m-2">
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">ID</h6>
                                </Col>
                                <Col >
                                    <h6>{student.id}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">First Name</h6>
                                </Col>
                                <Col>
                                    <h6>{student.firstName}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">Last Name</h6>
                                </Col>
                                <Col>
                                    <h6>{student.lastName?student.lastName:"-"}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">Full Name</h6>
                                </Col>
                                <Col>
                                    <h6>{student.firstName+" "+(student.lastName?student.lastName:"")}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">Birth Date</h6>
                                </Col>
                                <Col>
                                    <h6>{birthDate.toLocaleString('en-us', { year: 'numeric', month: 'long', day: 'numeric' })}</h6>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={4}>
                                    <h6 className="text-muted">Age</h6>
                                </Col>
                                <Col>
                                    <h6>{age + " years"}</h6>
                                </Col>
                            </Row>

                        </div>

                    </Card.Body>
                </Card>
                </Col>

            </Row>
    </Container>
    )

}