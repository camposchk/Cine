import Register from  "../../components/Register";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlertComponent from "../../components/AlertComponent";


function RegisterPage() {
    return (
        <> 
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <AlertComponent />
                        <Register />
                    </Col>
                </Row>
            </Container>;
        </>
    );
}

export default RegisterPage;