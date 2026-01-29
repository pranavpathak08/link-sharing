import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa'

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");


    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be atleast 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));

        if (errors[name]) {
            setErrors(prev => (
                {
                    ...prev,
                    [name]: ''
                }
            ))
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

        const result = await login(formData);
        setLoading(false);

        if (result.success) {
            navigate('/dashboard')
        } else {
            setServerError(result.error || 'Login Failed. Please try again');
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <Card>
                        <div>
                            <h2>Welcome Back</h2>
                            <p>Sign in to continue</p>
                        </div>
                        {serverError && (
                            <Alert variant="danger" dismissible onClose={() => setServerError('')}>
                                {serverError}
                            </Alert>
                        ) }
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
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

                            <Form.Group className="mb-3">
                                    <Form.Label>
                                        <FaLock className="me-2" />
                                        Password
                                    </Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        disabled={loading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                            </Form.Group>
                            <div className="d-flex justify-content-end mb-3">
                                <Link 
                                    to="/forgot-password" 
                                    className="text-decoration-none small"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
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
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                            </Button>
                        </Form>
                        <hr className="my-4" />
                         <p className="text-center mb-0">
                                Don't have an account?{' '}
                                <Link to="/register" className="text-decoration-none fw-semibold">
                                    Sign Up
                                </Link>
                        </p>
                        
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Login;