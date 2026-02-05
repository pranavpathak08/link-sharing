import { Card, Badge } from "react-bootstrap";
import { FaBook, FaUser, FaCalendar, FaUsers, FaGlobe, FaLock } from "react-icons/fa";
import { formatDate } from "../../utils/dateUtils";

const TopicInfoSidebar = ({ topic }) => {
    if (!topic) return null;

    return (
        <Card className="border-0 shadow-sm sticky-top">
            <Card.Body className="p-4">
                {/* Topic Icon */}
                <div className="text-center mb-4">
                    <div 
                        className="d-inline-flex align-items-center justify-content-center rounded-circle"
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
    );
};

export default TopicInfoSidebar;