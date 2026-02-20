import { Card, Button } from "react-bootstrap";
import { FaBook, FaUser, FaClock, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getTimeAgo } from "../../utils/dateUtils";

const PublicTopicCard = ({ topic, onSubscribe, isSubscribing }) => {
    const navigate = useNavigate();

    const handleCardClick = (e) => {
        // Don't navigate if clicking the subscribe button
        if (e.target.closest('.subscribe-btn')) {
            return;
        }
        navigate(`/topic/${topic._id}`);
    };

    const handleSubscribe = (e) => {
        e.stopPropagation();
        onSubscribe(topic._id);
    };

    return (
        <Card 
            className="public-topic-card border-0 shadow-sm h-100"
            onClick={handleCardClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.target.closest('.subscribe-btn')) {
                    navigate(`/topic/${topic._id}`);
                }
            }}
        >
            <Card.Body className="d-flex flex-column">
                {/* Topic Icon and Name */}
                <div className="d-flex align-items-start mb-3">
                    <div className="topic-icon-wrapper me-3">
                        <div className="topic-icon-circle">
                            <FaBook size={20} />
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <h5 className="topic-card-title mb-2">{topic.name}</h5>
                    </div>
                </div>

                {/* Topic Meta Information */}
                <div className="topic-meta mb-3 flex-grow-1">
                    {/* Created By */}
                    <div className="d-flex align-items-center mb-2 text-muted small">
                        <FaUser className="me-2" size={14} />
                        <span>
                            {topic.createdBy?.firstName} {topic.createdBy?.lastName}
                        </span>
                    </div>

                    {/* Created Time */}
                    <div className="d-flex align-items-center mb-2 text-muted small">
                        <FaClock className="me-2" size={14} />
                        <span>{getTimeAgo(topic.createdAt)}</span>
                    </div>

                    {/* Subscriber Count */}
                    <div className="d-flex align-items-center text-muted small">
                        <FaUsers className="me-2" size={14} />
                        <span>
                            {topic.subscriberCount} {topic.subscriberCount === 1 ? 'subscriber' : 'subscribers'}
                        </span>
                    </div>
                </div>

                {/* Subscribe Button */}
                <Button
                    variant="primary"
                    className="w-100 subscribe-btn"
                    onClick={handleSubscribe}
                    disabled={isSubscribing}
                >
                    {isSubscribing ? 'Subscribing...' : 'Subscribe'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default PublicTopicCard;