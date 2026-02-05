import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Navbar, Nav, NavDropdown, Spinner, Alert } from "react-bootstrap";
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
import { topicAPI, resourceAPI } from "../services/api";
import CreateTopicModal from "../components/CreateTopicModal";
import toast from "react-hot-toast";
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    // State management
    const [subscriptions, setSubscriptions] = useState([]);
    const [trendingTopics, setTrendingTopics] = useState([]);
    const [readingItems, setReadingItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Modal state
    const [showCreateModal, setShowCreateModal] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchDashboardData();
        }
    }, [isAuthenticated, navigate]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch user's subscribed topics
            const subscriptionsRes = await topicAPI.getMyTopics();
            setSubscriptions(subscriptionsRes.data.subscriptions || []);

            // Fetch trending topics
            const trendingRes = await topicAPI.getTrendingTopics(10);
            setTrendingTopics(trendingRes.data.topics || []);

            // Fetch reading items from all subscribed topics
            await fetchReadingItems(subscriptionsRes.data.subscriptions);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setError('Failed to load dashboard data. Please try again.');
            setLoading(false);
        }
    };

    const fetchReadingItems = async (subs) => {
        try {
            if (!subs || subs.length === 0) {
                setReadingItems([]);
                return;
            }

            // Fetch resources from all subscribed topics
            const resourcePromises = subs.map(sub => 
                resourceAPI.getTopicResources(sub.topic._id, { page: 1, limit: 5 })
                    .catch(err => {
                        console.error(`Error fetching resources for topic ${sub.topic._id}:`, err);
                        return { data: { resources: [] } };
                    })
            );

            const resourceResponses = await Promise.all(resourcePromises);
            
            // Combine and sort all resources by date
            const allResources = resourceResponses
                .flatMap(res => res.data.resources || [])
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 20); // Limit to 20 most recent items

            setReadingItems(allResources);
        } catch (error) {
            console.error('Error fetching reading items:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleTopicClick = (topicId) => {
        navigate(`/topic/${topicId}`);
    };

    const handleToggleReadStatus = async (resourceId) => {
        try {
            await resourceAPI.toggleReadStatus(resourceId);
            
            // Update the reading item in state
            setReadingItems(prev => prev.map(item => 
                item._id === resourceId 
                    ? { ...item, isRead: !item.isRead }
                    : item
            ));
            
            toast.success('Read status updated');
        } catch (error) {
            console.error('Error toggling read status:', error);
            toast.error('Failed to update read status');
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
                    <Navbar.Brand className="fw-bold gradient-text">
                        ChirpX
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="ms-auto align-items-center">
                            <NavDropdown
                                title={
                                    <span className="nav-dropdown">
                                        <div className="user-avatar d-inline-flex align-items-center justify-content-center me-2">
                                            <div className="avatar-circle small">
                                                {getInitials(user?.firstName, user?.lastName)}
                                            </div>
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
                                    My Topics
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item>
                                    <FaCog className="me-2" />
                                    Settings
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                    <FaSignOutAlt className="me-2" />
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container fluid className="dashboard-container py-4">
                <Row className="g-4">
                    {/* Left Sidebar - Subscriptions */}
                    <Col lg={3} className="sidebar-left">
                        <Card className="border-0 shadow-sm sticky-top">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h6 className="fw-bold mb-0">My Topics</h6>
                                    <span className="badge bg-primary rounded-pill">
                                        {subscriptions.length}
                                    </span>
                                </div>
                                
                                <div className="subscription-list">
                                    {loading ? (
                                        <div className="text-center py-3">
                                            <Spinner animation="border" size="sm" />
                                        </div>
                                    ) : subscriptions.length === 0 ? (
                                        <div className="empty-state py-3">
                                            <FaBook size={32} className="text-muted mb-2" />
                                            <p className="text-muted small mb-0">No subscriptions yet</p>
                                        </div>
                                    ) : (
                                        subscriptions.map(sub => (
                                            <div 
                                                key={sub._id} 
                                                className="subscription-item"
                                                onClick={() => handleTopicClick(sub.topic._id)}
                                            >
                                                <div className="d-flex align-items-start">
                                                    <div className="topic-icon me-2">
                                                        <FaBook size={14} />
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="topic-name">{sub.topic.name}</div>
                                                        <div className="d-flex align-items-center gap-2">
                                                            {sub.topic.visibility === 'PUBLIC' ? (
                                                                <FaGlobe size={10} className="text-success" />
                                                            ) : (
                                                                <FaLock size={10} className="text-warning" />
                                                            )}
                                                            <small className="text-muted">
                                                                {sub.seriousness}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Center Feed */}
                    <Col lg={6}>
                        {/* Create Topic Card */}
                        <Card className="create-topic-card border-0 shadow-sm mb-4">
                            <Card.Body>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="user-avatar">
                                        <div className="avatar-circle">
                                            {getInitials(user?.firstName, user?.lastName)}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="outline-primary"
                                        className="flex-grow-1 text-start topic-input"
                                        onClick={() => setShowCreateModal(true)}
                                    >
                                        Create a new topic...
                                    </Button>
                                    <Button 
                                        className="create-btn"
                                        onClick={() => setShowCreateModal(true)}
                                    >
                                        <FaPlus className="me-2" />
                                        Create
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>

                        {/* Error Alert */}
                        {error && (
                            <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        )}

                        {/* Reading Items Feed */}
                        <div className="reading-items-feed">
                            {loading ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <Spinner animation="border" variant="primary" />
                                        <p className="mt-3 text-muted">Loading feed...</p>
                                    </Card.Body>
                                </Card>
                            ) : readingItems.length === 0 ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <div className="empty-state">
                                            <FaBook size={48} className="text-muted mb-3" />
                                            <h5 className="text-muted">No posts yet</h5>
                                            <p className="text-muted">
                                                Subscribe to topics or create your own to see content here
                                            </p>
                                            <Button 
                                                variant="primary" 
                                                onClick={() => setShowCreateModal(true)}
                                                className="mt-2"
                                            >
                                                <FaPlus className="me-2" />
                                                Create Your First Topic
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                readingItems.map(item => (
                                    <Card key={item._id} className="reading-item-card border-0 shadow-sm mb-3">
                                        <Card.Body>
                                            {/* User Info */}
                                            <div className="d-flex mb-3">
                                                <div className="user-avatar me-3">
                                                    <div className="avatar-circle small">
                                                        {getInitials(item.createdBy?.firstName, item.createdBy?.lastName)}
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div>
                                                            <span className="fw-semibold">
                                                                {item.createdBy?.firstName} {item.createdBy?.lastName}
                                                            </span>
                                                            <span className="text-muted ms-2">
                                                                @{item.createdBy?.username}
                                                            </span>
                                                        </div>
                                                        <small className="text-muted">
                                                            {getTimeAgo(item.createdAt)}
                                                        </small>
                                                    </div>
                                                    <small 
                                                        className="text-primary"
                                                        style={{ cursor: 'pointer' }}
                                                        onClick={() => handleTopicClick(item.topic._id)}
                                                    >
                                                        {item.topic.name}
                                                    </small>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="item-description">{item.description}</p>

                                            {/* Link or Document */}
                                            {item.type === 'LINK' && item.url && (
                                                <a 
                                                    href={item.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="item-link d-inline-flex align-items-center mb-3"
                                                >
                                                    <FaLink className="me-2" />
                                                    <span className="text-truncate">{item.url}</span>
                                                </a>
                                            )}

                                            {item.type === 'DOCUMENT' && (
                                                <div className="mb-3">
                                                    <span className="badge bg-secondary">
                                                        <FaFileAlt className="me-2" />
                                                        Document attached
                                                    </span>
                                                </div>
                                            )}

                                            {/* Rating */}
                                            {item.averageRating && (
                                                <div className="mb-3">
                                                    <small className="text-warning">
                                                        ⭐ {item.averageRating} ({item.totalRatings} ratings)
                                                    </small>
                                                </div>
                                            )}

                                            {/* Actions */}
                                            <div className="item-actions d-flex gap-2">
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
                                                    onClick={() => handleToggleReadStatus(item._id)}
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
                    <Col lg={3} className="sidebar-right">
                        <Card className="border-0 shadow-sm sticky-top">
                            <Card.Body>
                                <h6 className="fw-bold mb-3">
                                    <FaChartLine className="me-2 text-danger" />
                                    Trending Topics
                                </h6>
                                <div className="trending-list">
                                    {loading ? (
                                        <div className="text-center py-3">
                                            <Spinner animation="border" size="sm" />
                                        </div>
                                    ) : trendingTopics.length === 0 ? (
                                        <p className="text-muted small">No trending topics</p>
                                    ) : (
                                        trendingTopics.map((topic, index) => (
                                            <div 
                                                key={topic._id} 
                                                className="trending-item"
                                                onClick={() => handleTopicClick(topic._id)}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <div className="trending-number me-3">
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="topic-name fw-semibold">
                                                            {topic.name}
                                                        </div>
                                                        <small className="text-muted">
                                                            {topic.subscriberCount} subscribers
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            {/* Create Topic Modal */}
            <CreateTopicModal 
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
            />
        </div>
    );
};

export default Dashboard;