// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { FaEnvelope, FaLock } from 'react-icons/fa'

const Login = () => {
    // const navigate = useNavigate();
    // const { login } = useAuth();
    
    // const [formData, setFormData] = useState({
    //     email: "",
    //     password: ""
    // });

    // const [errors, setErrors] = useState({});
    // const [loading, setLoading] = useState(false);
    // const [serverError, setServerError] = useState("");


    // const validateForm = () => {
    //     const newErrors = {};

    //     if (!formData.email.trim()) {
    //         newErrors.email = "Email is required";
    //     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //         newErrors.email = "Email is invalid";
    //     }

    //     if (!formData.password) {
    //         newErrors.password = "Password is required";
    //     } else if (formData.password.length < 6) {
    //         newErrors.password = "Password must be atleast 6 characters";
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prev => (
    //         {
    //             ...prev,
    //             [name]: value
    //         }
    //     ));

    //     if (errors[name]) {
    //         setErrors(prev => (
    //             {
    //                 ...prev,
    //                 [name]: ''
    //             }
    //         ))
    //     }

    //     if (serverError) {
    //         setServerError('');
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!validateForm()) {
    //         return;
    //     }

    //     setLoading(true);
    //     setServerError('');

    //     const result = await login(formData);
    //     setLoading(false);

    //     if (result.success) {
    //         navigate('/dashboard')
    //     } else {
    //         setServerError(result.error || 'Login Failed. Please try again');
    //     }
    // };

    return (
        <Container>
            <h2>Login</h2>
        </Container>
    )
}

export default Login;