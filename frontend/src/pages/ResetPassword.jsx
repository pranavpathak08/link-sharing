import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaLock, FaCheckCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { authAPI } from "../services/api.js";
import toast from "react-hot-toast";
import './ResetPassword.css'

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            <div className="reset-password-page">
                <Container className="py-5">
                    <Row className="justify-content-center">
                        <Col md={6} lg={5}>
                            <Card className="success-card shadow-lg border-0">
                                <Card.Body className="p-5 text-center">
                                    <div className="success-animation mb-4">
                                        <div className="success-circle">
                                            <FaCheckCircle size={80} className="text-success" />
                                        </div>
                                    </div>
                                    <h2 className="fw-bold mb-3">Password Reset Successful!</h2>
                                    <p className="text-muted mb-4">
                                        Your password has been successfully reset. You can now log in with your new password.
                                    </p>
                                    <div className="redirect-info mb-4">
                                        <Spinner animation="border" size="sm" className="me-2" />
                                        <span className="text-muted">Redirecting to login page...</span>
                                    </div>
                                    
                                    <Link to="/login" className="btn btn-primary btn-lg w-100 shadow">
                                        Go to Login Now
                                    </Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }

    // Reset Password Form
    return (
        <div className="reset-password-page">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="reset-card shadow-lg border-0">
                            <Card.Body className="p-5">
                                <div className="text-center mb-4">
                                    <div className="lock-icon-wrapper mb-3">
                                        <FaLock size={48} className="text-primary" />
                                    </div>
                                    <h2 className="fw-bold">Reset Your Password</h2>
                                    <p className="text-muted">Enter your new password below</p>
                                </div>

                                {serverError && (
                                    <Alert 
                                        variant="danger" 
                                        dismissible 
                                        onClose={() => setServerError('')}
                                        className="mb-4"
                                    >
                                        <div className="d-flex align-items-center">
                                            <span>{serverError}</span>
                                        </div>
                                    </Alert>
                                )}

                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            <FaLock className="me-2" />
                                            New Password
                                        </Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                placeholder="Enter new password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                                disabled={loading}
                                                autoFocus
                                                autoComplete="new-password"
                                                style={{ paddingRight: '45px' }}
                                            />
                                            <Button
                                                variant="link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowPassword(!showPassword);
                                                }}
                                                disabled={loading}
                                                className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                                                style={{ zIndex: 10, background: 'transparent' }}
                                                tabIndex={-1}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </div>
                                        <Form.Text className="text-muted">
                                            Must be at least 6 characters long
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label className="fw-semibold">
                                            <FaLock className="me-2" />
                                            Confirm New Password
                                        </Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                placeholder="Confirm new password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmPassword}
                                                disabled={loading}
                                                autoComplete="new-password"
                                                style={{ paddingRight: '45px' }}
                                            />
                                            <Button
                                                variant="link"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setShowConfirmPassword(!showConfirmPassword);
                                                }}
                                                disabled={loading}
                                                className="position-absolute end-0 top-50 translate-middle-y border-0 text-muted"
                                                style={{ zIndex: 10, background: 'transparent' }}
                                                tabIndex={-1}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </Button>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </div>
                                    </Form.Group>

                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="lg"
                                        className="w-100 py-3 fw-semibold shadow"
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
                                                Resetting Password...
                                            </>
                                        ) : (
                                            <>
                                                <FaLock className="me-2" />
                                                Reset Password
                                            </>
                                        )}
                                    </Button>
                                </Form>

                                <hr className="my-4" />

                                <div className="text-center">
                                    <p className="mb-0 text-muted">
                                        Remember your password?{' '}
                                        <Link to="/login" className="text-decoration-none fw-semibold">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ResetPassword;