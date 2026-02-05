import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';

const HomeNavbar = ({ isAuthenticated, user }) => {
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
                    <FaBook className="me-2 text-primary" size={28} />
                    <span className="gradient-text">ChirpX</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="#features" className="mx-2">Features</Nav.Link>
                        <Nav.Link as={Link} to="#how-it-works" className="mx-2">How It Works</Nav.Link>
                        {isAuthenticated ? (
                            <>
                                <Nav.Link as={Link} to="/dashboard" className="mx-2">
                                    Welcome, {user?.firstName}
                                </Nav.Link>
                                <Link to="/dashboard">
                                    <Button variant="primary" className="ms-3">
                                        Dashboard
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login" className="mx-2">Sign In</Nav.Link>
                                <Link to="/register">
                                    <Button variant="primary" className="ms-3">
                                        Get Started
                                    </Button>
                                </Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default HomeNavbar;