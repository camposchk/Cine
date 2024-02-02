import Login from  "../../components/Login";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AlertComponent from "../../components/AlertComponent";


function LoginPage() {
    return (
        <> 
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} md={6}>
                        <AlertComponent />
                        <Login />
                    </Col>
                </Row>
            </Container>;
        </>
    );
}

export default LoginPage;
