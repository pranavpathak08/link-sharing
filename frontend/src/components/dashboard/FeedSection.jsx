import { Card, Spinner, Button, Alert } from "react-bootstrap";
import { FaBook, FaPlus } from "react-icons/fa";
import ResourceCard from "./ResourceCard";

const FeedSection = ({ 
    loading, 
    error,
    readingItems, 
    onTopicClick,
    onToggleRead,
    onCreateTopicClick
}) => {
    if (error) {
        return (
            <Alert variant="danger" dismissible>
                {error}
            </Alert>
        );
    }

    if (loading) {
        return (
            <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3 text-muted">Loading feed...</p>
                </Card.Body>
            </Card>
        );
    }

    if (readingItems.length === 0) {
        return (
            <Card className="border-0 shadow-sm">
                <Card.Body className="text-center py-5">
                    <div className="empty-state">
                        <FaBook size={48} className="text-muted mb-3" />
                        <h5 className="text-muted">No posts yet</h5>
                        <p className="text-muted">
                            Subscribe to topics or create your own to see content here
                        </p>
                        <Button 
                            variant="primary" 
                            onClick={onCreateTopicClick}
                            className="mt-2"
                        >
                            <FaPlus className="me-2" />
                            Create Your First Topic
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <div className="reading-items-feed">
            {readingItems.map(item => (
                <ResourceCard
                    key={item._id}
                    resource={item}
                    onTopicClick={onTopicClick}
                    onToggleRead={onToggleRead}
                />
            ))}
        </div>
    );
};

export default FeedSection;