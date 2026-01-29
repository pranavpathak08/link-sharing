import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Form, Col, Button, Card, Alert, Spinner } from 'react-bootstrap'
import { FaUser, FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        //FirstName validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be atleast 2 characters"
        }

        //LastName validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters";
        }

        //Username validation
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        } else if (formData.username.trim().length < 3) {
            newErrors.username = "Username must be atleast 3 characters";
        } else if (formData.username.trim().length > 30) {
            newErrors.username = "Username must not exceed 30 characters";
        } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
            newErrors.username = "Username can only contain letters, numbers, underscores"
        }

        //Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        //Password Validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        //Confirm Password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
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

        //Clear error for this field when user starts typing
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

        const { confirmPassword, ...registrationData } = formData;
        const result = await register(registrationData);

        setLoading(false);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setServerError(result.error || "Registration failed. Please try again");
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6}>
                    <Card className="shadow-sm">
                        <Card.Body className="p-4">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold">Create Account</h2>
                                <p className="text-muted">Join us today</p>
                            </div>

                            {serverError && (
                                <Alert variant="danger" dismissible onClose={() => setServerError('')}>
                                    {serverError}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaUser className="me-2" />
                                                First Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                placeholder="Enter first name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.firstName}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.firstName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaUser className="me-2" />
                                                Last Name
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                placeholder="Enter last name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                isInvalid={!!errors.lastName}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.lastName}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaUserTag className="me-2" />
                                        Username
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="username"
                                        placeholder="Choose a username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        isInvalid={!!errors.username}
                                        disabled={loading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.username}
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        3-30 characters, letters, numbers, and underscores only
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaEnvelope className="me-2" />
                                        Email Address
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        disabled={loading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaLock className="me-2" />
                                                Password
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="password"
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                isInvalid={!!errors.password}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>
                                                <FaLock className="me-2" />
                                                Confirm Password
                                            </Form.Label>
                                            <Form.Control
                                                type="password"
                                                name="confirmPassword"
                                                placeholder="Confirm password"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                isInvalid={!!errors.confirmPassword}
                                                disabled={loading}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.confirmPassword}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Button
                                    variant="primary"
                                    type="submit"
                                    className="w-100 py-2 mt-3"
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
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                            </Form>

                            <hr className="my-4" />

                            <p className="text-center mb-0">
                                Already have an account?{' '}
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

export default Register;