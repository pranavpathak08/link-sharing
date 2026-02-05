import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBook, FaUser, FaSignOutAlt, FaChartLine, FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = ({ user }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="dashboard-page">
            {/* Admin Navbar */}
            <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand>
                        <FaBook className="me-2" />
                        ChirpX - Admin Panel
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <FaUser className="me-2" />
                                {user.firstName} {user.lastName}
                            </Nav.Link>
                            <Nav.Link onClick={handleLogout}>
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="py-5">
                <Row className="mb-4">
                    <Col>
                        <h2 className="fw-bold">Admin Dashboard</h2>
                        <p className="text-muted">Welcome back, {user.firstName}!</p>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaUsers size={48} className="text-primary mb-3" />
                                <h5 className="fw-bold">Manage Users</h5>
                                <p className="text-muted">View and manage all users</p>
                                <Button variant="primary">View Users</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaBook size={48} className="text-success mb-3" />
                                <h5 className="fw-bold">All Topics</h5>
                                <p className="text-muted">View and moderate topics</p>
                                <Button variant="success">View Topics</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaChartLine size={48} className="text-info mb-3" />
                                <h5 className="fw-bold">Analytics</h5>
                                <p className="text-muted">View platform statistics</p>
                                <Button variant="info">View Stats</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AdminDashboard;