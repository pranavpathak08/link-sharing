import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaBook, FaArrowLeft, FaLock } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTopicData } from '../hooks/useTopicData';
import AppNavbar from '../components/shared/AppNavbar';
import TopicInfoSidebar from '../components/topic/TopicInfoSidebar';
import CreatePostCard from '../components/topic/CreatePostCard';
import TopicResourceCard from '../components/topic/TopicResourceCard';
import './Dashboard.css';

const TopicPage = () => {
    const { topicId } = useParams();
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    const {
        topic,
        resources,
        loading,
        posting,
        error,
        isSubscribed,
        handleCreatePost,
        handleToggleReadStatus,
        handleDownloadDocument
    } = useTopicData(topicId);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <AppNavbar showBackButton onBackClick={handleBackClick} />
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
                <AppNavbar showBackButton onBackClick={handleBackClick} />
                <Container className="py-5 text-center">
                    <div className="empty-state">
                        <FaBook size={64} className="text-muted mb-3" />
                        <h2 className="text-muted mb-3">{error || 'Topic not found'}</h2>
                        <Button variant="primary" onClick={handleBackClick}>
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
            <AppNavbar showBackButton onBackClick={handleBackClick} />

            <Container fluid className="dashboard-container py-4">
                <Row className="g-4">
                    {/* Left Sidebar - Topic Info */}
                    <Col lg={3} className="sidebar-left">
                        <TopicInfoSidebar topic={topic} />
                    </Col>

                    {/* Center - Main Feed */}
                    <Col lg={9}>
                        {/* Create Post Section */}
                        {isSubscribed ? (
                            <CreatePostCard
                                user={user}
                                onSubmit={handleCreatePost}
                                isSubmitting={posting}
                            />
                        ) : (
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
                                    <TopicResourceCard
                                        key={resource._id}
                                        resource={resource}
                                        isSubscribed={isSubscribed}
                                        onToggleRead={handleToggleReadStatus}
                                        onDownload={handleDownloadDocument}
                                    />
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