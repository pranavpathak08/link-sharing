import { useEffect } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaCog,
    FaChartLine,
    FaUsers,
    FaPlus
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";


const Dashboard = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (user?.admin) {
        return (
            <div className="dashboard-page">
                {/* Admin Navbar */}
                <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
                    <Container>
                        <Navbar.Brand>
                            <FaBook className="me-2" />
                            ReadingList - Admin Panel
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

                    <Row className="mt-5">
                        <Col>
                            <Card className="shadow-sm border-0">
                                <Card.Body>
                                    <h5 className="fw-bold mb-4">Recent Activity</h5>
                                    <p className="text-muted">No recent activity to display</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    // Regular User Dashboard
    return (
        <div className="dashboard-page">
            {/* User Navbar */}
            <Navbar bg="light" expand="lg" className="shadow-sm">
                <Container>
                    <Navbar.Brand>
                        <FaBook className="me-2" />
                        ReadingList
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <FaUser className="me-2" />
                                {user?.firstName} {user?.lastName}
                            </Nav.Link>
                            <Nav.Link>
                                <FaCog className="me-2" />
                                Settings
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
                        <h2 className="fw-bold">Welcome back, {user?.firstName}!</h2>
                        <p className="text-muted">Manage your reading lists and discover new topics</p>
                    </Col>
                    <Col xs="auto">
                        <Button variant="primary" size="lg">
                            <FaPlus className="me-2" />
                            Create Topic
                        </Button>
                    </Col>
                </Row>

                <Row className="g-4">
                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaBook size={48} className="text-primary mb-3" />
                                <h3 className="fw-bold mb-2">0</h3>
                                <p className="text-muted mb-0">My Topics</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaUsers size={48} className="text-success mb-3" />
                                <h3 className="fw-bold mb-2">0</h3>
                                <p className="text-muted mb-0">Subscriptions</p>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0 h-100">
                            <Card.Body className="text-center p-4">
                                <FaChartLine size={48} className="text-info mb-3" />
                                <h3 className="fw-bold mb-2">0</h3>
                                <p className="text-muted mb-0">Resources Read</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="mt-5">
                    <Col md={8}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h5 className="fw-bold mb-4">My Topics</h5>
                                <div className="text-center py-5">
                                    <FaBook size={64} className="text-muted mb-3" />
                                    <p className="text-muted">You haven't created any topics yet</p>
                                    <Button variant="primary" className="mt-3">
                                        <FaPlus className="me-2" />
                                        Create Your First Topic
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col md={4}>
                        <Card className="shadow-sm border-0">
                            <Card.Body>
                                <h5 className="fw-bold mb-4">Trending Topics</h5>
                                <div className="text-center py-4">
                                    <p className="text-muted small">No trending topics available</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Dashboard;