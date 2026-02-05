import { useState } from "react";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { FaLink, FaFileAlt, FaPlus, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const CreatePostForm = ({ onSubmit, onCancel, isSubmitting }) => {
    const [postType, setPostType] = useState('LINK');
    const [postDescription, setPostDescription] = useState('');
    const [postUrl, setPostUrl] = useState('');
    const [postFile, setPostFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!postDescription.trim()) {
            toast.error('Please add a description');
            return;
        }

        if (postType === 'LINK' && !postUrl.trim()) {
            toast.error('Please add a URL');
            return;
        }

        if (postType === 'DOCUMENT' && !postFile) {
            toast.error('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('description', postDescription);
        formData.append('type', postType);

        if (postType === 'LINK') {
            formData.append('url', postUrl);
        } else {
            formData.append('file', postFile);
        }

        await onSubmit(formData);
        
        // Reset form
        setPostDescription('');
        setPostUrl('');
        setPostFile(null);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <div className="d-flex gap-3">
                    <Form.Check
                        type="radio"
                        id="type-link"
                        label={
                            <span>
                                <FaLink className="me-2" />
                                Link
                            </span>
                        }
                        checked={postType === 'LINK'}
                        onChange={() => setPostType('LINK')}
                    />
                    <Form.Check
                        type="radio"
                        id="type-document"
                        label={
                            <span>
                                <FaFileAlt className="me-2" />
                                Document
                            </span>
                        }
                        checked={postType === 'DOCUMENT'}
                        onChange={() => setPostType('DOCUMENT')}
                    />
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="What's this about?"
                    value={postDescription}
                    onChange={(e) => setPostDescription(e.target.value)}
                    disabled={isSubmitting}
                />
            </Form.Group>

            {postType === 'LINK' && (
                <Form.Group className="mb-3">
                    <InputGroup>
                        <InputGroup.Text>
                            <FaLink />
                        </InputGroup.Text>
                        <Form.Control
                            type="url"
                            placeholder="https://example.com"
                            value={postUrl}
                            onChange={(e) => setPostUrl(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </InputGroup>
                </Form.Group>
            )}

            {postType === 'DOCUMENT' && (
                <Form.Group className="mb-3">
                    <Form.Control
                        type="file"
                        onChange={(e) => setPostFile(e.target.files[0])}
                        disabled={isSubmitting}
                        accept=".pdf,.doc,.docx,.txt,.zip,.rar"
                    />
                    <Form.Text className="text-muted">
                        Max 10MB • PDF, DOC, DOCX, TXT, ZIP, RAR
                    </Form.Text>
                </Form.Group>
            )}

            <div className="d-flex gap-2">
                <Button 
                    className="create-btn"
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                className="me-2"
                            />
                            Posting...
                        </>
                    ) : (
                        <>
                            <FaPlus className="me-2" />
                            Post
                        </>
                    )}
                </Button>
                <Button 
                    variant="outline-secondary"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
            </div>
        </Form>
    );
};

export default CreatePostForm;