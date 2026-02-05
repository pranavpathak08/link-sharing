import { Card, Spinner } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

const TrendingTopicsSidebar = ({ trendingTopics, loading, onTopicClick }) => {
    return (
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