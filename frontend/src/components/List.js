import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import StudentCard from "./StudentCard";

export default function List({students, toggleShowToast, setDeleted}) {
    const {scrollX, scrollY} = useSelector(state => ({...state.student}));
    useEffect(()=>{
        window.scrollTo({top: scrollY, left: scrollX, behavior: 'instant'})
    })

    return (
        <Container>
            {
                students.map((student)=>(
                    <Row key={student.id}>
                     <StudentCard student={student} toggleShowToast={toggleShowToast} setDeleted={setDeleted}/>
                    </Row>
                ))
            }
        </Container>
    )
}