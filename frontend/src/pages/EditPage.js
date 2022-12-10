import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import StudentServices from '../services/StudentServices';
import { updateStudent } from '../store/slices/studentSlice';

export default function EditPage(){
    const initialState = {
        id:null,
        firstName:"",
        lastName:"",
        birthDate:""
    }

    const navigate = useNavigate();

    const [student, setStudent] = useState(initialState);        
    const dispatch = useDispatch();
    const {success, loading, error} = useSelector(state=> ({...state.student}));
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({});
    const {id} = useParams();

    useEffect(()=>{
            async function  getStudent(){
                await StudentServices.getStudentById(id).then(res=>setStudent({...res.data})).catch(e => {
                    navigate("/");
                });           
            }

            getStudent();

    },[dispatch])


    const toggleShowToast = () => setShowToast(!showToast);

    const spinner =   (<div style={{position: "relative", zIndex: 999}} className="d-flex justify-content-center">
                <Spinner style={{position: "absolute"}} className="" animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>);


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

    function backHandler(){
        navigate(-1);

    }

    function inputChangeHandler(e){
        const { name, value } = e.target;
        setStudent({...student, [name]:value});

        if ( !!errors[name] ) setErrors({
            ...errors,
            [name]: null
          })
        
    }

     function formHandler(e){
        e.preventDefault();

        const newErrors = {};

        if (!student.firstName || student.firstName===''){
            newErrors.firstName = "Please fill the first name."
        }

        if (!student.birthDate || student.birthDate===''){
            newErrors.birthDate = "Please fill the birthdate."
        }

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
            
        }else{
            dispatch(updateStudent({student}));
           
            toggleShowToast();
            if(success){
                setErrors({});
            }

        }
        
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={4}>
                    <Button className="mb-2" variant="dark" size="sm" onClick={backHandler}><FontAwesomeIcon icon={faArrowLeft}/> Back</Button>
                    {success && !loading? toastFunction("Success", "Student updated successfully.", "green") : toastFunction("Failed", error.message, "red")}
                    <Card>
                        <Card.Title className="d-flex justify-content-center mt-3">Edit Student</Card.Title>
                        <Card.Body>
                    {loading && spinner}
                        <Form noValidate >
                             <Form.Group className="mb-3" controlId="id">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" name="id" prequired onChange={inputChangeHandler} value={student.id} disabled/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="firstName" placeholder="Enter first name" required onChange={inputChangeHandler} isInvalid={!!errors.firstName} value={student.firstName}/>
                                <Form.Control.Feedback type="invalid">
                                    {errors.firstName}
                                </Form.Control.Feedback>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" placeholder="Enter last name (optional)" onChange={inputChangeHandler} value={student.lastName}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="birthDate">
                                <Form.Label>Birth Date</Form.Label>
                                <Form.Control type="date" name="birthDate" placeholder="Enter birth date" required onChange={inputChangeHandler} isInvalid={!!errors.birthDate} value={student.birthDate}/>
                                <Form.Control.Feedback type="invalid">
                                 {errors.birthDate}
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button onClick={formHandler} variant="success" type="submit">
                                Save
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>

            </Row>
    </Container>
    )

}