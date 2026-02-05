import { Card, Button } from "react-bootstrap";
import { 
    FaLink, 
    FaFileAlt, 
    FaHeart, 
    FaComment, 
    FaShare, 
    FaCheckCircle 
} from "react-icons/fa";
import UserAvatar from "../shared/UserAvatar";
import { getTimeAgo } from "../../utils/dateUtils";

const ResourceCard = ({ 
    resource, 
    onTopicClick, 
    onToggleRead 
}) => {
    return (
        <Card className="reading-item-card border-0 shadow-sm mb-3">
            <Card.Body>
                {/* User Info */}
                <div className="d-flex mb-3">
                    <UserAvatar 
                        firstName={resource.createdBy?.firstName}
                        lastName={resource.createdBy?.lastName}
                        size="small"
                        className="me-3"
                    />
                    <div className="flex-grow-1">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <div>
                                <span className="fw-semibold">
                                    {resource.createdBy?.firstName} {resource.createdBy?.lastName}
                                </span>
                                <span className="text-muted ms-2">
                                    @{resource.createdBy?.username}
                                </span>
                            </div>
                            <small className="text-muted">
                                {getTimeAgo(resource.createdAt)}
                            </small>
                        </div>
                        {resource.topic && (
                            <small 
                                className="text-primary"
                                style={{ cursor: 'pointer' }}
                                onClick={() => onTopicClick?.(resource.topic._id)}
                                role="button"
                                tabIndex={0}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') onTopicClick?.(resource.topic._id);
                                }}
                            >
                                {resource.topic.name}
                            </small>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="item-description">{resource.description}</p>

                {/* Link or Document */}
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

                {resource.type === 'DOCUMENT' && (
                    <div className="mb-3">
                        <span className="badge bg-secondary">
                            <FaFileAlt className="me-2" />
                            Document attached
                        </span>
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
                    <Button 
                        variant="link" 
                        size="sm" 
                        className={`action-btn ${resource.isRead ? 'text-success' : ''}`}
                        onClick={() => onToggleRead(resource._id)}
                    >
                        <FaCheckCircle className="me-1" />
                        {resource.isRead ? 'Read' : 'Mark as Read'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ResourceCard;