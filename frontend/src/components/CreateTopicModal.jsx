import { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { FaPlus, FaGlobe, FaLock, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { topicAPI } from "../services/api";
import toast from "react-hot-toast";

const CreateTopicModal = ({ show, onHide }) => {
    const navigate = useNavigate();
    
    const [creatingTopic, setCreatingTopic] = useState(false);
    const [topicForm, setTopicForm] = useState({
        name: '',
        visibility: 'PUBLIC'
    });
    const [formErrors, setFormErrors] = useState({});

    const handleClose = () => {
        setTopicForm({ name: '', visibility: 'PUBLIC' });
        setFormErrors({});
        onHide();
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setTopicForm(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Clear error for this field
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        
        if (!topicForm.name.trim()) {
            errors.name = 'Topic name is required';
        } else if (topicForm.name.trim().length < 3) {
            errors.name = 'Topic name must be at least 3 characters';
        } else if (topicForm.name.trim().length > 100) {
            errors.name = 'Topic name must not exceed 100 characters';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setCreatingTopic(true);

        try {
            const response = await topicAPI.createTopic(topicForm);
            const newTopic = response.data.topic;
            
            toast.success('Topic created successfully!');
            handleClose();
            
            // Redirect to the newly created topic page
            navigate(`/topic/${newTopic._id}`);
            
        } catch (error) {
            console.error('Error creating topic:', error);
            const errorMessage = error.response?.data?.message || 'Failed to create topic';
            toast.error(errorMessage);
            
            if (error.response?.data?.message?.includes('already have a topic')) {
                setFormErrors({ name: 'You already have a topic with this name' });
            }
        } finally {
            setCreatingTopic(false);
        }
    };

    return (
        <Modal 
            show={show} 
            onHide={handleClose}
            centered
            backdrop="static"
        >
            <Modal.Header>
                <Modal.Title>Create New Topic</Modal.Title>
                <Button
                    variant="link"
                    onClick={handleClose}
                    className="text-secondary p-0 border-0"
                    style={{ fontSize: '1.5rem' }}
                >
                    <FaTimes />
                </Button>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Topic Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={topicForm.name}
                            onChange={handleFormChange}
                            placeholder="Enter topic name"
                            isInvalid={!!formErrors.name}
                            disabled={creatingTopic}
                        />
                        <Form.Control.Feedback type="invalid">
                            {formErrors.name}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Visibility</Form.Label>
                        <div>
                            <Form.Check
                                type="radio"
                                id="visibility-public"
                                name="visibility"
                                value="PUBLIC"
                                label={
                                    <span>
                                        <FaGlobe className="me-2 text-primary" />
                                        Public - Anyone can view and subscribe
                                    </span>
                                }
                                checked={topicForm.visibility === 'PUBLIC'}
                                onChange={handleFormChange}
                                disabled={creatingTopic}
                                className="mb-2"
                            />
                            <Form.Check
                                type="radio"
                                id="visibility-private"
                                name="visibility"
                                value="PRIVATE"
                                label={
                                    <span>
                                        <FaLock className="me-2 text-secondary" />
                                        Private - Only you can view
                                    </span>
                                }
                                checked={topicForm.visibility === 'PRIVATE'}
                                onChange={handleFormChange}
                                disabled={creatingTopic}
                            />
                        </div>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            disabled={creatingTopic}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            type="submit"
                            disabled={creatingTopic}
                        >
                            {creatingTopic ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        className="me-2"
                                    />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <FaPlus className="me-2" />
                                    Create Topic
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateTopicModal;