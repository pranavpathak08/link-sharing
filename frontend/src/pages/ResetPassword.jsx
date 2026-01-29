import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaLock, FaCheckCircle } from "react-icons/fa";
import { authAPI } from "../services/api.js";
import toast from "react-hot-toast";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const validateForm = () => {
        const newErrors = {};

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be atleast 6 characters';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }

        if (serverError) {
            setServerError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setServerError('');

        try {
            await authAPI.resetPassword(token, formData.password);
            setSuccess(true);
            toast.success('Password reset successful');

            setTimeout(() => {
                navigate('/login')
            }, 3000);
        } catch (error) {
            const message = error.response?.data?.message || "Failed to reset password";
            setServerError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }
    if (success) {
        return (
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4 text-center">
                                <div className="text-success mb-3">
                                    <FaCheckCircle size={50} />
                                </div>
                                <h2 className="fw-bold mb-3">Password Reset Successful!</h2>
                                <p className="text-muted">
                                    Your password has been successfully reset.
                                </p>
                                <p className="text-muted small">
                                    Redirecting to login page...
                                </p>
                                
                                <Link to="/login" className="btn btn-primary w-100 mt-3">
                                    Go to Login
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Reset Password</h2>
                                <p className="text-muted">Enter your new password</p>
                            </div>

                            {serverError && (
                                <Alert variant="danger" dismissible onClose={() => setServerError('')}>
                                    {serverError}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        New Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter new password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        disabled={loading}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        Must be at least 6 characters long
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        Confirm New Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Confirm new password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={!!errors.confirmPassword}
                                        disabled={loading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                className="me-2"
                                            />
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>
                            </Form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">
                                Remember your password?{' '}
                                <Link to="/login" className="text-decoration-none fw-semibold">
                                    Sign In
                                </Link>
                            </p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ResetPassword;