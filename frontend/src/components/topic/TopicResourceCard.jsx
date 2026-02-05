import { Card, Button } from "react-bootstrap";
import { 
    FaLink, 
    FaDownload, 
    FaHeart, 
    FaComment, 
    FaShare, 
    FaCheckCircle 
} from "react-icons/fa";
import UserAvatar from "../shared/UserAvatar";
import { getTimeAgo } from "../../utils/dateUtils";

const TopicResourceCard = ({ 
    resource, 
    isSubscribed,
    onToggleRead,
    onDownload
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
                            onClick={() => onDownload(resource._id)}
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
                            onClick={() => onToggleRead(resource._id)}
                        >
                            <FaCheckCircle className="me-1" />
                            {resource.isRead ? 'Read' : 'Mark as Read'}
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default TopicResourceCard;