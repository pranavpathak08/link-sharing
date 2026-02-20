import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { topicAPI } from '../services/api';
import AppNavbar from '../components/shared/AppNavbar';
import CreateTopicCard from '../components/dashboard/CreateTopicCard';
import PublicTopicCard from '../components/browse/PublicTopicCard';
import CreateTopicModal from '../components/CreateTopicModal';
import toast from 'react-hot-toast';
import './Dashboard.css';
import './BrowseTopics.css';

const BrowseTopics = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    
    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [subscribingTopicId, setSubscribingTopicId] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        fetchPublicTopics();
    }, [searchQuery]);

    const fetchPublicTopics = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = {};
            if (searchQuery.trim()) {
                params.search = searchQuery.trim();
            }

            const response = await topicAPI.browseAllPublicTopics(params);
            setTopics(response.data.topics || []);
        } catch (error) {
            console.error('Error fetching public topics:', error);
            setError('Failed to load topics. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubscribe = async (topicId) => {
        setSubscribingTopicId(topicId);
        // Subscription functionality will be implemented later
        toast.info('Subscribe functionality will be implemented soon!');
        setTimeout(() => setSubscribingTopicId(null), 1000);
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="dashboard-page browse-topics-page">
            <AppNavbar showBackButton onBackClick={handleBackClick} />

            <Container fluid className="dashboard-container py-4">
                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>
                        {/* Create Topic Card */}
                        <CreateTopicCard
                            user={user}
                            onCreateClick={() => setShowCreateModal(true)}
                        />

                        {/* Page Header */}
                        <div className="browse-header mb-4">
                            <h2 className="fw-bold mb-3">Who to Subscribe?</h2>
                            
                            {/* Search Bar */}
                            <InputGroup className="search-bar">
                                <InputGroup.Text className="bg-white border-end-0">
                                    <FaSearch className="text-muted" />
                                </InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    placeholder="Search topics..."
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    className="border-start-0"
                                />
                            </InputGroup>
                        </div>

                        {/* Topics Grid */}
                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner animation="border" variant="primary" />
                                <p className="mt-3 text-muted">Loading topics...</p>
                            </div>
                        ) : error ? (
                            <Alert variant="danger" dismissible onClose={() => setError(null)}>
                                {error}
                            </Alert>
                        ) : topics.length === 0 ? (
                            <Alert variant="info">
                                {searchQuery 
                                    ? `No topics found matching "${searchQuery}"`
                                    : 'No public topics available at the moment.'
                                }
                            </Alert>
                        ) : (
                            <Row className="g-4">
                                {topics.map((topic) => (
                                    <Col md={6} lg={4} key={topic._id}>
                                        <PublicTopicCard
                                            topic={topic}
                                            onSubscribe={handleSubscribe}
                                            isSubscribing={ subscribingTopicId === topic._id }
                                            
                                        />
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </Col>
                </Row>
            </Container>

            {/* Create Topic Modal */}
            <CreateTopicModal
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                onSuccess={() => {
                    setShowCreateModal(false);
                    fetchPublicTopics();
                }}
            />
        </div>
    );
};

export default BrowseTopics;