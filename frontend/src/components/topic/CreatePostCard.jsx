import { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { FaPlus, FaTimes } from "react-icons/fa";
import UserAvatar from "../shared/UserAvatar";
import CreatePostForm from "./CreatePostForm";

const CreatePostCard = ({ user, onSubmit, isSubmitting }) => {
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = async (formData) => {
        await onSubmit(formData);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <Card className="create-topic-card border-0 shadow-sm mb-4">
            <Card.Body className="p-4">
                {!showForm ? (
                    <div className="d-flex align-items-center gap-3">
                        <UserAvatar 
                            firstName={user?.firstName}
                            lastName={user?.lastName}
                        />
                        <Button 
                            variant="outline-primary"
                            className="flex-grow-1 text-start topic-input"
                            onClick={() => setShowForm(true)}
                        >
                            Share something...
                        </Button>
                        <Button 
                            className="create-btn"
                            onClick={() => setShowForm(true)}
                        >
                            <FaPlus className="me-2" />
                            Post
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                                <UserAvatar 
                                    firstName={user?.firstName}
                                    lastName={user?.lastName}
                                    className="me-3"
                                />
                                <h6 className="mb-0">Create a Post</h6>
                            </div>
                            <Button
                                variant="link"
                                onClick={handleCancel}
                                className="text-secondary p-0"
                            >
                                <FaTimes size={20} />
                            </Button>
                        </div>
                        <CreatePostForm
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                            isSubmitting={isSubmitting}
                        />
                    </>
                )}
            </Card.Body>
        </Card>
    );
};

export default CreatePostCard;