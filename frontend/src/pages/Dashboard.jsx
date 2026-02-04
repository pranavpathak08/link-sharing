import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaCog,
    FaChartLine,
    FaUsers,
    FaPlus,
    FaGlobe,
    FaLock,
    FaHeart,
    FaComment,
    FaShare,
    FaCheckCircle,
    FaFileAlt,
    FaLink
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // State management
    const [subscriptions, setSubscriptions] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [readingItems, setReadingItems] = useState([]);
    const [topicInput, setTopicInput] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchDashboardData();
        }
    }, [isAuthenticated, navigate]);

    const fetchDashboardData = async () => {
        try {
            // TODO: Replace with actual API calls
            // Simulated data for now
            setSubscriptions([
                { _id: '1', name: 'Machine Learning', visibility: 'PUBLIC', seriousness: 'SERIOUS', subscriberCount: 245 },
                { _id: '2', name: 'Web Development', visibility: 'PUBLIC', seriousness: 'VERY_SERIOUS', subscriberCount: 189 },
                { _id: '3', name: 'Personal Finance', visibility: 'PRIVATE', seriousness: 'CASUAL', subscriberCount: 12 }
            ]);

            setTrendingTopics([
                { _id: 't1', name: 'Artificial Intelligence', subscriberCount: 1543 },
                { _id: 't2', name: 'Climate Change', subscriberCount: 1287 },
                { _id: 't3', name: 'Blockchain', subscriberCount: 956 },
                { _id: 't4', name: 'Space Exploration', subscriberCount: 834 },
                { _id: 't5', name: 'Quantum Computing', subscriberCount: 721 }
            ]);

            setReadingItems([
                {
                    _id: 'r1',
                    description: 'Latest breakthrough in GPT-4 architecture and its implications for AI safety',
                    type: 'LINK',
                    url: 'https://example.com/article1',
                    createdBy: { firstName: 'John', lastName: 'Doe', username: 'johndoe' },
                    topic: { name: 'Machine Learning' },
                    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                    averageRating: 4.5,
                    totalRatings: 23,
                    isRead: false
                },
                {
                    _id: 'r2',
                    description: 'Understanding React Server Components - A comprehensive guide',
                    type: 'DOCUMENT',
                    filePath: '/docs/react-guide.pdf',
                    createdBy: { firstName: 'Jane', lastName: 'Smith', username: 'janesmith' },
                    topic: { name: 'Web Development' },
                    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                    averageRating: 4.8,
                    totalRatings: 45,
                    isRead: true
                }
            ]);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleCreateTopic = async (e) => {
        e.preventDefault();
        if (!topicInput.trim()) return;

        try {
            // TODO: Replace with actual API call
            console.log('Creating topic:', topicInput);
            setTopicInput('');
            // Refresh subscriptions after creation
            // fetchDashboardData();
        } catch (error) {
            console.error('Error creating topic:', error);
        }
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();
    };

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + 'y ago';
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + 'mo ago';
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + 'd ago';
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + 'h ago';
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + 'm ago';
        
        return Math.floor(seconds) + 's ago';
    };

    if (user?.admin) {
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
    }

    // Regular User Dashboard
    return (
        <div className="dashboard-page">
            {/* User Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                <Container fluid>
                    <Navbar.Brand className="fw-bold">
                        {/* <FaBook className="me-2 text-primary" /> */}
                        ChirpX
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto align-items-center">
                            <NavDropdown
                                title={
                                    <span>
                                        <div className="user-avatar-small d-inline-flex align-items-center justify-content-center me-2">
                                            {getInitials(user?.firstName, user?.lastName)}
                                        </div>
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                }
                                id="user-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item>
                                    <FaUser className="me-2" />
                                    Profile
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <FaBook className="me-2" />
                                    Topics
                                </NavDropdown.Item>
                                <NavDropdown.Item>
                                    <FaFileAlt className="me-2" />
                                    Reading Items
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <FaCog className="me-2" />
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="py-4">
                <Row className="g-4">
                    {/* Left Sidebar - Subscriptions */}
                    <Col lg={3} className="d-none d-lg-block">
                        <div className="sidebar-left sticky-sidebar">
                            <Card className="border-0 shadow-sm mb-3">
                                <Card.Body>
                                    <h6 className="fw-bold mb-3">My Subscriptions</h6>
                                    <div className="mb-3">
                                        <span className="text-muted">Total: </span>
                                        <span className="fw-bold">{subscriptions.length}</span>
                                    </div>
                                    
                                    <div className="subscriptions-list">
                                        {subscriptions.length === 0 ? (
                                            <p className="text-muted small">No subscriptions yet</p>
                                        ) : (
                                            subscriptions.map(sub => (
                                                <div key={sub._id} className="subscription-item">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex align-items-center gap-2">
                                                                {sub.visibility === 'PUBLIC' ? (
                                                                    <FaGlobe size={12} className="text-success" />
                                                                ) : (
                                                                    <FaLock size={12} className="text-warning" />
                                                                )}
                                                                <span className="subscription-name">{sub.name}</span>
                                                            </div>
                                                            <small className="text-muted">{sub.seriousness}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>

                    {/* Center Feed */}
                    <Col lg={6}>
                        {/* Create Topic Input */}
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body>
                                <Form onSubmit={handleCreateTopic}>
                                    <InputGroup>
                                        <div className="user-avatar me-3">
                                            {getInitials(user?.firstName, user?.lastName)}
                                        </div>
                                        <Form.Control
                                            type="text"
                                            placeholder="New Chirp..."
                                            value={topicInput}
                                            onChange={(e) => setTopicInput(e.target.value)}
                                            className="create-topic-input"
                                        />
                                        <Button 
                                            variant="primary" 
                                            type="submit"
                                            disabled={!topicInput.trim()}
                                        >
                                            <FaPlus className="me-2" />
                                            Topic
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Card.Body>
                        </Card>

                        {/* Reading Items Feed */}
                        <div className="reading-items-feed">
                            {loading ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <div className="spinner-border text-primary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : readingItems.length === 0 ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <FaBook size={48} className="text-muted mb-3" />
                                        <p className="text-muted">No reading items yet</p>
                                        <small className="text-muted">Subscribe to topics to see content</small>
                                    </Card.Body>
                                </Card>
                            ) : (
                                readingItems.map(item => (
                                    <Card key={item._id} className="reading-item border-0 shadow-sm mb-3">
                                        <Card.Body>
                                            <div className="d-flex mb-3">
                                                <div className="user-avatar-small me-3">
                                                    {getInitials(item.createdBy.firstName, item.createdBy.lastName)}
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div>
                                                            <span className="fw-semibold">
                                                                {item.createdBy.firstName} {item.createdBy.lastName}
                                                            </span>
                                                            <span className="text-muted ms-2">
                                                                @{item.createdBy.username}
                                                            </span>
                                                        </div>
                                                        <small className="text-muted">{getTimeAgo(item.createdAt)}</small>
                                                    </div>
                                                    <small className="text-primary">{item.topic.name}</small>
                                                </div>
                                            </div>

                                            <p className="mb-3">{item.description}</p>

                                            {item.type === 'LINK' && (
                                                <a 
                                                    href={item.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="resource-link"
                                                >
                                                    <FaLink className="me-2" />
                                                    {item.url}
                                                </a>
                                            )}

                                            {item.type === 'DOCUMENT' && (
                                                <div className="document-badge">
                                                    <FaFileAlt className="me-2" />
                                                    Document attached
                                                </div>
                                            )}

                                            {item.averageRating && (
                                                <div className="mt-2 mb-3">
                                                    <small className="text-warning">
                                                        ⭐ {item.averageRating} ({item.totalRatings} ratings)
                                                    </small>
                                                </div>
                                            )}

                                            <div className="reading-item-actions">
                                                <Button variant="link" size="sm" className="action-btn">
                                                    <FaHeart className="me-1" />
                                                    Like
                                                </Button>
                                                <Button variant="link" size="sm" className="action-btn">
                                                    <FaComment className="me-1" />
                                                    Comment
                                                </Button>
                                                <Button variant="link" size="sm" className="action-btn">
                                                    <FaShare className="me-1" />
                                                    Share
                                                </Button>
                                                <Button 
                                                    variant="link" 
                                                    size="sm" 
                                                    className={`action-btn ${item.isRead ? 'text-success' : ''}`}
                                                >
                                                    <FaCheckCircle className="me-1" />
                                                    {item.isRead ? 'Read' : 'Mark as Read'}
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Col>

                    {/* Right Sidebar - Trending Topics */}
                    <Col lg={3} className="d-none d-lg-block">
                        <div className="sidebar-right sticky-sidebar">
                            <Card className="border-0 shadow-sm">
                                <Card.Body>
                                    <h6 className="fw-bold mb-3">Trending Topics</h6>
                                    <div className="trending-list">
                                        {trendingTopics.map((topic, index) => (
                                            <div key={topic._id} className="trending-item">
                                                <div className="d-flex align-items-center">
                                                    <span className="trending-rank me-3">{index + 1}</span>
                                                    <div className="flex-grow-1">
                                                        <div className="trending-name"
                                                            onClick={ () =>
                                                                // console.log(topic._id)
                                                                navigate(`/topic/${ topic._id }`)
                                                            }
                                                        >{ topic.name }</div>
                                                        <small className="text-muted">
                                                            {topic.subscriberCount} subscribers
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Dashboard;