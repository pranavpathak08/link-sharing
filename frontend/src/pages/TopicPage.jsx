import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Form,
    InputGroup,
    Navbar,
    Nav,
    NavDropdown,
    Badge,
    Spinner,
    Alert
} from 'react-bootstrap';
import {
    FaBook,
    FaUser,
    FaSignOutAlt,
    FaCog,
    FaGlobe,
    FaLock,
    FaCalendar,
    FaPlus,
    FaLink,
    FaFileAlt,
    FaHeart,
    FaComment,
    FaShare,
    FaCheckCircle,
    FaArrowLeft,
    FaUsers,
    FaTimes,
    FaDownload
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { topicAPI, resourceAPI } from '../services/api';
import toast from 'react-hot-toast';
import './Dashboard.css';

const TopicPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();

    // State
    const [topic, setTopic] = useState(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState(null);
    const [isSubscribed, setIsSubscribed] = useState(false);

    // Create Post Form State
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [postType, setPostType] = useState('LINK');
    const [postDescription, setPostDescription] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [postFile, setPostFile] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            fetchTopicData();
        }
    }, [topicId, isAuthenticated, navigate]);

    const fetchTopicData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch topic details
            const topicRes = await topicAPI.getTopicDetails(topicId);
            setTopic(topicRes.data.topic);
            setIsSubscribed(topicRes.data.isSubscribed);

            // Fetch resources for this topic
            const resourcesRes = await resourceAPI.getTopicResources(topicId, { 
                page: 1, 
                limit: 50 
            });
            setResources(resourcesRes.data.resources || []);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching topic data:', error);
            const errorMessage = error.response?.data?.message || 'Failed to load topic';
            setError(errorMessage);
            setLoading(false);
            
            if (error.response?.status === 404) {
                toast.error('Topic not found');
            } else if (error.response?.status === 403) {
                toast.error('You do not have access to this topic');
            }
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleCreatePost = async (e) => {
        e.preventDefault();

        if (!postDescription.trim()) {
            toast.error('Please add a description');
            return;
        }

        if (postType === 'LINK' && !postUrl.trim()) {
            toast.error('Please add a URL');
            return;
        }

        if (postType === 'DOCUMENT' && !postFile) {
            toast.error('Please select a file');
            return;
        }

        try {
            setPosting(true);

            const formData = new FormData();
            formData.append('description', postDescription);
            formData.append('type', postType);

            if (postType === 'LINK') {
                formData.append('url', postUrl);
            } else {
                formData.append('file', postFile);
            }

            await resourceAPI.addResource(topicId, formData);
            
            toast.success('Post created successfully!');
            
            // Reset form
            setPostDescription('');
            setPostUrl('');
            setPostFile(null);
            setShowCreatePost(false);
            
            // Refresh resources
            fetchTopicData();
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error(error.response?.data?.message || 'Failed to create post');
        } finally {
            setPosting(false);
        }
    };

    const handleToggleReadStatus = async (resourceId) => {
        try {
            await resourceAPI.toggleReadStatus(resourceId);
            
            // Update the resource in state
            setResources(prev => prev.map(resource => 
                resource._id === resourceId 
                    ? { ...resource, isRead: !resource.isRead }
                    : resource
            ));
            
            toast.success('Read status updated');
        } catch (error) {
            console.error('Error toggling read status:', error);
            toast.error('Failed to update read status');
        }
    };

    const handleDownloadDocument = async (resourceId) => {
        try {
            const response = await resourceAPI.downloadDocument(resourceId);
            
            // Create blob and download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `document-${resourceId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            
            toast.success('Download started');
        } catch (error) {
            console.error('Error downloading document:', error);
            toast.error('Failed to download document');
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

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                    <Container fluid>
                        <Navbar.Brand className="fw-bold gradient-text">ChirpX</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="py-5 text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading topic...</p>
                </Container>
            </div>
        );
    }

    if (error || !topic) {
        return (
            <div className="dashboard-page">
                <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                    <Container fluid>
                        <Navbar.Brand className="fw-bold gradient-text">ChirpX</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="py-5 text-center">
                    <div className="empty-state">
                        <FaBook size={64} className="text-muted mb-3" />
                        <h2 className="text-muted mb-3">{error || 'Topic not found'}</h2>
                        <Button variant="primary" onClick={() => navigate('/dashboard')}>
                            <FaArrowLeft className="me-2" />
                            Back to Dashboard
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            {/* Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                <Container fluid>
                    <Navbar.Brand className="fw-bold gradient-text d-flex align-items-center">
                        <Button 
                            variant="link" 
                            className="text-decoration-none p-0 me-3 text-muted"
                            onClick={() => navigate('/dashboard')}
                        >
                            <FaArrowLeft size={20} />
                        </Button>
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
                                <NavDropdown.Item onClick={() => navigate('/dashboard')}>
                                    <FaUser className="me-2" />
                                    Dashboard
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
                    {/* Left Sidebar - Topic Info */}
                    <Col lg={3} className="sidebar-left">
                        <Card className="border-0 shadow-sm sticky-top">
                            <Card.Body className="p-4">
                                {/* Topic Icon */}
                                <div className="text-center mb-4">
                                    <div className="d-inline-flex align-items-center justify-content-center rounded-circle"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)'
                                        }}
                                    >
                                        <FaBook size={36} className="text-primary" />
                                    </div>
                                </div>
                                
                                {/* Topic Name */}
                                <h4 className="fw-bold mb-3 text-center">{topic.name}</h4>
                                
                                {/* Visibility Badge */}
                                <div className="text-center mb-4">
                                    {topic.visibility === 'PUBLIC' ? (
                                        <Badge bg="success" className="px-3 py-2">
                                            <FaGlobe className="me-2" />
                                            Public
                                        </Badge>
                                    ) : (
                                        <Badge bg="warning" className="px-3 py-2">
                                            <FaLock className="me-2" />
                                            Private
                                        </Badge>
                                    )}
                                </div>
                                
                                {/* Topic Meta */}
                                <div className="border-top pt-3">
                                    <div className="mb-3">
                                        <div className="d-flex align-items-start text-muted small">
                                            <FaUser className="me-2 mt-1" size={14} />
                                            <div className="flex-grow-1">
                                                <div className="fw-semibold text-dark">Created by</div>
                                                <div>
                                                    {topic.createdBy?.firstName} {topic.createdBy?.lastName}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mb-3">
                                        <div className="d-flex align-items-start text-muted small">
                                            <FaCalendar className="me-2 mt-1" size={14} />
                                            <div className="flex-grow-1">
                                                <div className="fw-semibold text-dark">Created on</div>
                                                <div>{formatDate(topic.createdAt)}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {topic.subscriberCount !== undefined && (
                                        <div className="border-top pt-3 text-center">
                                            <FaUsers className="text-primary mb-2" size={20} />
                                            <h5 className="mb-0 fw-bold">{topic.subscriberCount}</h5>
                                            <small className="text-muted">Subscribers</small>
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Center - Main Feed */}
                    <Col lg={9}>
                        {/* Create Post Section */}
                        {isSubscribed && (
                            <Card className="create-topic-card border-0 shadow-sm mb-4">
                                <Card.Body className="p-4">
                                    {!showCreatePost ? (
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="user-avatar">
                                                <div className="avatar-circle">
                                                    {getInitials(user?.firstName, user?.lastName)}
                                                </div>
                                            </div>
                                            <Button 
                                                variant="outline-primary"
                                                className="flex-grow-1 text-start topic-input"
                                                onClick={() => setShowCreatePost(true)}
                                            >
                                                Share something...
                                            </Button>
                                            <Button 
                                                className="create-btn"
                                                onClick={() => setShowCreatePost(true)}
                                            >
                                                <FaPlus className="me-2" />
                                                Post
                                            </Button>
                                        </div>
                                    ) : (
                                        <Form onSubmit={handleCreatePost}>
                                            <div className="d-flex align-items-center justify-content-between mb-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="user-avatar me-3">
                                                        <div className="avatar-circle">
                                                            {getInitials(user?.firstName, user?.lastName)}
                                                        </div>
                                                    </div>
                                                    <h6 className="mb-0">Create a Post</h6>
                                                </div>
                                                <Button
                                                    variant="link"
                                                    onClick={() => {
                                                        setShowCreatePost(false);
                                                        setPostDescription('');
                                                        setPostUrl('');
                                                        setPostFile(null);
                                                    }}
                                                    className="text-secondary p-0"
                                                >
                                                    <FaTimes size={20} />
                                                </Button>
                                            </div>

                                            <Form.Group className="mb-3">
                                                <div className="d-flex gap-3">
                                                    <Form.Check
                                                        type="radio"
                                                        id="type-link"
                                                        label={
                                                            <span>
                                                                <FaLink className="me-2" />
                                                                Link
                                                            </span>
                                                        }
                                                        checked={postType === 'LINK'}
                                                        onChange={() => setPostType('LINK')}
                                                    />
                                                    <Form.Check
                                                        type="radio"
                                                        id="type-document"
                                                        label={
                                                            <span>
                                                                <FaFileAlt className="me-2" />
                                                                Document
                                                            </span>
                                                        }
                                                        checked={postType === 'DOCUMENT'}
                                                        onChange={() => setPostType('DOCUMENT')}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-3">
                                                <Form.Control
                                                    as="textarea"
                                                    rows={3}
                                                    placeholder="What's this about?"
                                                    value={postDescription}
                                                    onChange={(e) => setPostDescription(e.target.value)}
                                                    disabled={posting}
                                                />
                                            </Form.Group>

                                            {postType === 'LINK' && (
                                                <Form.Group className="mb-3">
                                                    <InputGroup>
                                                        <InputGroup.Text>
                                                            <FaLink />
                                                        </InputGroup.Text>
                                                        <Form.Control
                                                            type="url"
                                                            placeholder="https://example.com"
                                                            value={postUrl}
                                                            onChange={(e) => setPostUrl(e.target.value)}
                                                            disabled={posting}
                                                        />
                                                    </InputGroup>
                                                </Form.Group>
                                            )}

                                            {postType === 'DOCUMENT' && (
                                                <Form.Group className="mb-3">
                                                    <Form.Control
                                                        type="file"
                                                        onChange={(e) => setPostFile(e.target.files[0])}
                                                        disabled={posting}
                                                        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                                                    />
                                                    <Form.Text className="text-muted">
                                                        Max 10MB • PDF, DOC, DOCX, TXT, ZIP, RAR
                                                    </Form.Text>
                                                </Form.Group>
                                            )}

                                            <div className="d-flex gap-2">
                                                <Button 
                                                    className="create-btn"
                                                    type="submit"
                                                    disabled={posting}
                                                >
                                                    {posting ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                className="me-2"
                                                            />
                                                            Posting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FaPlus className="me-2" />
                                                            Post
                                                        </>
                                                    )}
                                                </Button>
                                                <Button 
                                                    variant="outline-secondary"
                                                    onClick={() => {
                                                        setShowCreatePost(false);
                                                        setPostDescription('');
                                                        setPostUrl('');
                                                        setPostFile(null);
                                                    }}
                                                    disabled={posting}
                                                >
                                                    Cancel
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Card.Body>
                            </Card>
                        )}

                        {/* Not Subscribed Message */}
                        {!isSubscribed && (
                            <Alert variant="info" className="mb-4">
                                <FaLock className="me-2" />
                                You must be subscribed to this topic to create posts.
                            </Alert>
                        )}

                        {/* Resources Feed */}
                        <div className="reading-items-feed">
                            <h5 className="mb-3 fw-bold">Posts</h5>
                            
                            {resources.length === 0 ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <div className="empty-state">
                                            <FaBook size={48} className="text-muted mb-3" />
                                            <h5 className="text-muted">No posts yet</h5>
                                            <p className="text-muted">
                                                {isSubscribed 
                                                    ? "Be the first to share something!"
                                                    : "Subscribe to this topic to see and create posts"
                                                }
                                            </p>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : (
                                resources.map(resource => (
                                    <Card key={resource._id} className="reading-item-card border-0 shadow-sm mb-3">
                                        <Card.Body>
                                            {/* User Info */}
                                            <div className="d-flex mb-3">
                                                <div className="user-avatar me-3">
                                                    <div className="avatar-circle small">
                                                        {getInitials(
                                                            resource.createdBy?.firstName,
                                                            resource.createdBy?.lastName
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <div className="d-flex align-items-center justify-content-between mb-1">
                                                        <div>
                                                            <span className="fw-semibold">
                                                                {resource.createdBy?.firstName}{' '}
                                                                {resource.createdBy?.lastName}
                                                            </span>
                                                            <span className="text-muted ms-2">
                                                                @{resource.createdBy?.username}
                                                            </span>
                                                        </div>
                                                        <small className="text-muted">
                                                            {getTimeAgo(resource.createdAt)}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="item-description">{resource.description}</p>

                                            {/* Link */}
                                            {resource.type === 'LINK' && resource.url && (
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="item-link d-inline-flex align-items-center mb-3"
                                                >
                                                    <FaLink className="me-2" />
                                                    <span className="text-truncate">{resource.url}</span>
                                                </a>
                                            )}

                                            {/* Document */}
                                            {resource.type === 'DOCUMENT' && (
                                                <div className="mb-3">
                                                    <Button
                                                        variant="outline-primary"
                                                        size="sm"
                                                        onClick={() => handleDownloadDocument(resource._id)}
                                                    >
                                                        <FaDownload className="me-2" />
                                                        Download Document
                                                    </Button>
                                                </div>
                                            )}

                                            {/* Rating */}
                                            {resource.averageRating && (
                                                <div className="mb-3">
                                                    <small className="text-warning">
                                                        ⭐ {resource.averageRating} ({resource.totalRatings} ratings)
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
                                                {isSubscribed && (
                                                    <Button
                                                        variant="link"
                                                        size="sm"
                                                        className={`action-btn ${resource.isRead ? 'text-success' : ''}`}
                                                        onClick={() => handleToggleReadStatus(resource._id)}
                                                    >
                                                        <FaCheckCircle className="me-1" />
                                                        {resource.isRead ? 'Read' : 'Mark as Read'}
                                                    </Button>
                                                )}
                                            </div>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TopicPage;