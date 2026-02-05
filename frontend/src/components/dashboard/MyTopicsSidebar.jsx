import { Card, Spinner, Badge } from "react-bootstrap";
import { FaBook, FaGlobe, FaLock } from "react-icons/fa";

const MyTopicsSidebar = ({ subscriptions, loading, onTopicClick }) => {
    return (
        <Card className="border-0 shadow-sm sticky-top">
            <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0">My Topics</h6>
                    <Badge bg="primary" pill>
                        {subscriptions.length}
                    </Badge>
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
                                onClick={() => onTopicClick(sub.topic._id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') onTopicClick(sub.topic._id);
                                }}
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
    );
};

export default MyTopicsSidebar;