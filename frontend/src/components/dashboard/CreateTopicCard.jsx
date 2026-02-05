import { Card, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import UserAvatar from "../shared/UserAvatar";

const CreateTopicCard = ({ user, onCreateClick }) => {
    return (
        <Card className="create-topic-card border-0 shadow-sm mb-4">
            <Card.Body>
                <div className="d-flex align-items-center gap-3">
                    <UserAvatar 
                        firstName={user?.firstName} 
                        lastName={user?.lastName}
                    />
                    <Button 
                        variant="outline-primary"
                        className="flex-grow-1 text-start topic-input"
                        onClick={onCreateClick}
                    >
                        Create a new topic...
                    </Button>
                    <Button 
                        className="create-btn"
                        onClick={onCreateClick}
                    >
                        <FaPlus className="me-2" />
                        Create
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CreateTopicCard;