import { Card, Spinner, Button } from "react-bootstrap";
import { FaChartLine, FaGlobe } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TrendingTopicsSidebar = ({ trendingTopics, loading, onTopicClick }) => {
    const navigate = useNavigate();

    const handleBrowseAll = () => {
        navigate('/browse-topics');
    };

    return (
        <Card className="border-0 shadow-sm sticky-top">
            <Card.Body>
                {/* Browse All Topics Button */}
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="w-100 mb-3 browse-all-btn"
                    onClick={handleBrowseAll}
                >
                    <FaGlobe className="me-2" />
                    Browse All Topics
                </Button>

                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="fw-bold mb-0">
                        {/* <FaChartLine className="me-2 text-danger" /> */}
                        Trending Topics
                    </h5>
                </div>
                
                

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
                                onClick={() => onTopicClick(topic._id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') onTopicClick(topic._id);
                                }}
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
    );
};

export default TrendingTopicsSidebar;