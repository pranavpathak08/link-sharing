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
    Spinner
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
    FaArrowLeft
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
// import { topicAPI, resourceAPI } from '../services/api';
import toast from 'react-hot-toast';
// import './TopicPage.css';

const TopicPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // State
    const [topic, setTopic] = useState(null);
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [posting, setPosting] = useState(false);

    // Create Post Form State
    const [showCreatePost, setShowCreatePost] = useState(false);
    const [postType, setPostType] = useState('LINK'); // LINK or DOCUMENT
    const [postDescription, setPostDescription] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [postFile, setPostFile] = useState(null);

    useEffect(() => {
        fetchTopicData();
    }, [topicId]);

    const fetchTopicData = async () => {
    try {
        setLoading(true); 

        // 🔹 Dummy Topic
        const dummyTopic = {
            _id: topicId,
            name: 'Artificial Intelligence',
            visibility: 'PUBLIC',
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            subscriberCount: 1245,
            createdBy: {
                firstName: 'Admin',
                lastName: 'User'
            }
        };

        // 🔹 Dummy Resources (Posts)
        const dummyResources = [
            {
                _id: 'r1',
                description: 'Understanding Large Language Models and how ChatGPT works',
                type: 'LINK',
                url: 'https://example.com/llm-guide',
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
                createdBy: {
                    firstName: 'John',
                    lastName: 'Doe',
                    username: 'johndoe'
                },
                averageRating: 4.6,
                totalRatings: 32,
                isRead: false
            },
            {
                _id: 'r2',
                description: 'AI Roadmap PDF for beginners to advanced',
                type: 'DOCUMENT',
                createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
                createdBy: {
                    firstName: 'Jane',
                    lastName: 'Smith',
                    username: 'janesmith'
                },
                averageRating: 4.9,
                totalRatings: 54,
                isRead: true
            }
        ];

        setTopic(dummyTopic);
        setResources(dummyResources);

        setLoading(false);
    } catch (error) {
        console.error('Error loading dummy data:', error);
        setLoading(false);
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
            <div className="topic-page">
                <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                    <Container fluid>
                        <Navbar.Brand className="fw-bold">ChirpX</Navbar.Brand>
                    </Container>
                </Navbar>
                <Container className="py-5 text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading topic...</p>
                </Container>
            </div>
        );
    }

    if (!topic) {
        return (
            <div className="topic-page">
                <Container className="py-5 text-center">
                    <h2>Topic not found</h2>
                    <Button variant="primary" onClick={() => navigate('/dashboard')}>
                        Back to Dashboard
                    </Button>
                </Container>
            </div>
        );
    }

    return (
        <div className="topic-page">
            {/* Navbar */}
            <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                <Container fluid>
                    <Navbar.Brand className="fw-bold d-flex align-items-center">
                        <Button 
                            variant="link" 
                            className="text-decoration-none p-0 me-3"
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
                                <NavDropdown.Item onClick={() => navigate('/dashboard')}>
                                    <FaUser className="me-2" />
                                    Dashboard
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
                    {/* Left Sidebar - Topic Info */}
                    <Col lg={3}>
                        <Card className="topic-info-card border-0 shadow-sm sticky-top">
                            <Card.Body className="p-4">
                                <div className="topic-icon-large mb-3">
                                    <FaBook size={32} />
                                </div>
                                
                                <h4 className="fw-bold mb-3">{topic.name}</h4>
                                
                                <div className="topic-meta mb-3">
                                    <div className="d-flex align-items-center mb-2">
                                        {topic.visibility === 'PUBLIC' ? (
                                            <>
                                                <FaGlobe className="me-2 text-success" size={16} />
                                                <Badge bg="success">Public</Badge>
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="me-2 text-warning" size={16} />
                                                <Badge bg="warning">Private</Badge>
                                            </>
                                        )}
                                    </div>
                                    
                                    <div className="text-muted small mt-3">
                                        <div className="d-flex align-items-start mb-2">
                                            <FaUser className="me-2 mt-1" size={14} />
                                            <div>
                                                <div className="fw-semibold">Created by</div>
                                                <div>
                                                    {topic.createdBy?.firstName} {topic.createdBy?.lastName}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="d-flex align-items-start">
                                            <FaCalendar className="me-2 mt-1" size={14} />
                                            <div>
                                                <div className="fw-semibold">Created on</div>
                                                <div>{formatDate(topic.createdAt)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {topic.subscriberCount !== undefined && (
                                    <div className="mt-4 pt-3 border-top">
                                        <div className="text-center">
                                            <h5 className="mb-0">{topic.subscriberCount}</h5>
                                            <small className="text-muted">Subscribers</small>
                                        </div>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Center - Main Feed */}
                    <Col lg={9}>
                        {/* Create Post Section */}
                        <Card className="border-0 shadow-sm mb-4">
                            <Card.Body className="p-4">
                                {!showCreatePost ? (
                                    <Button 
                                        variant="primary" 
                                        onClick={() => setShowCreatePost(true)}
                                        className="w-100 d-flex align-items-center justify-content-center"
                                    >
                                        <FaPlus className="me-2" />
                                        Create Post
                                    </Button>
                                ) : (
                                    <Form onSubmit={handleCreatePost}>
                                        <div className="d-flex align-items-center mb-3">
                                            <div className="user-avatar me-3">
                                                {getInitials(user?.firstName, user?.lastName)}
                                            </div>
                                            <h6 className="mb-0">Create a Post</h6>
                                        </div>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Post Type</Form.Label>
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
                                            <Form.Label>Description</Form.Label>
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
                                                <Form.Label>URL</Form.Label>
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
                                                <Form.Label>Upload File</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                    onChange={(e) => setPostFile(e.target.files[0])}
                                                    disabled={posting}
                                                    accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                                                />
                                                <Form.Text className="text-muted">
                                                    Accepted formats: PDF, DOC, DOCX, TXT, ZIP, RAR (Max 10MB)
                                                </Form.Text>
                                            </Form.Group>
                                        )}

                                        <div className="d-flex gap-2">
                                            <Button 
                                                variant="primary" 
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

                        {/* Resources Feed */}
                        <div className="resources-feed">
                            <h5 className="mb-3">Posts</h5>
                            
                            {resources.length === 0 ? (
                                <Card className="border-0 shadow-sm">
                                    <Card.Body className="text-center py-5">
                                        <FaBook size={48} className="text-muted mb-3" />
                                        <p className="text-muted">No posts yet</p>
                                        <small className="text-muted">
                                            Be the first to share something!
                                        </small>
                                    </Card.Body>
                                </Card>
                            ) : (
                                resources.map(resource => (
                                    <Card key={resource._id} className="resource-card border-0 shadow-sm mb-3">
                                        <Card.Body>
                                            <div className="d-flex mb-3">
                                                <div className="user-avatar-small me-3">
                                                    {getInitials(
                                                        resource.createdBy?.firstName,
                                                        resource.createdBy?.lastName
                                                    )}
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

                                            <p className="mb-3">{resource.description}</p>

                                            {resource.type === 'LINK' && resource.url && (
                                                <a
                                                    href={resource.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="resource-link"
                                                >
                                                    <FaLink className="me-2" />
                                                    {resource.url}
                                                </a>
                                            )}

                                            {resource.type === 'DOCUMENT' && (
                                                <div className="document-badge">
                                                    <FaFileAlt className="me-2" />
                                                    Document attached
                                                </div>
                                            )}

                                            {resource.averageRating && (
                                                <div className="mt-2 mb-3">
                                                    <small className="text-warning">
                                                        ⭐ {resource.averageRating} ({resource.totalRatings} ratings)
                                                    </small>
                                                </div>
                                            )}

                                            <div className="resource-actions">
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
                                                    className={`action-btn ${resource.isRead ? 'text-success' : ''}`}
                                                >
                                                    <FaCheckCircle className="me-1" />
                                                    {resource.isRead ? 'Read' : 'Mark as Read'}
                                                </Button>
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