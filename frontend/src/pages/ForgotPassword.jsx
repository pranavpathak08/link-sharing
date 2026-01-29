import { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateEmail = () => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Email is invalid");
            return false;
        }
        return true;
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) {
            setError('')
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail()) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            await authAPI.forgotPassword(email);
            setSuccess(true);
            toast.success("Password reset link sent to your email");
        } catch (error) {
            const message = error.response?.data?.message || "Failed to send reset link";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={ 6 } lg={ 5 }>
                        <Card className="shadow-sm">
                            <Card.Body className="p-4 text-center">
                                <div className="mb-4">
                                    <div className="text-success mb-3">
                                        <FaEnvelope size={ 50 } />
                                    </div>
                                    <h2 className="fw-bold">Check Your Email</h2>
                                    <p className="text-muted mt-3">
                                        We've sent a password reset link to <strong>{ email }</strong>
                                    </p>
                                    <p className="text-muted small">
                                        If you don't see the email, check your spam folder or try again.
                                    </p>
                                </div>

                                <Link to="/login" className="btn btn-primary w-100">
                                    Back to Login
                                </Link>

                                <div className="mt-3">
                                    <Button
                                        variant="link"
                                        className="text-decoration-none"
                                        onClick={ () => {
                                            setSuccess(false);
                                            setEmail('');
                                        } }
                                    >
                                        Try a different email
                                    </Button>
                                </div>
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
                            <div className="mb-4">
                                <Link 
                                    to="/login" 
                                    className="text-decoration-none d-inline-flex align-items-center mb-3"
                                >
                                    <FaArrowLeft className="me-2" />
                                    Back to Login
                                </Link>
                                
                                <h2 className="fw-bold">Forgot Password?</h2>
                                <p className="text-muted">
                                    No worries! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

                            {error && (
                                <Alert variant="danger" dismissible onClose={() => setError('')}>
                                    {error}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label>
                                        <FaEnvelope className="me-2" />
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={handleChange}
                                        isInvalid={!!error}
                                        disabled={loading}
                                        autoFocus
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error}
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
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default ForgotPassword;