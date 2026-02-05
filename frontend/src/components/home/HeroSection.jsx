import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLightbulb, FaArrowRight, FaStar } from 'react-icons/fa';

const HeroSection = ({ isAuthenticated }) => {
    return (
        <section className="hero-section py-5">
            <Container>
                <Row className="align-items-center min-vh-75">
                    <Col lg={6} className="hero-content mb-5 mb-lg-0">
                        <div className="badge-pill mb-4 animate-fade-in">
                            <FaLightbulb className="me-2" />
                            Your Personal Reading Companion
                        </div>
                        <h1 className="display-3 fw-bold mb-4 animate-slide-up">
                            Organize Your Reading,
                            <span className="gradient-text d-block"> Amplify Your Learning</span>
                        </h1>
                        <p className="lead mb-4 text-muted animate-slide-up delay-1">
                            Create curated reading lists, collaborate with others, and track your 
                            intellectual journey. From casual browsing to serious research, we've got you covered.
                        </p>
                        <div className="cta-buttons animate-slide-up delay-2">
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <Button size="lg" variant="primary" className="me-3 shadow">
                                        Go to Dashboard <FaArrowRight className="ms-2" />
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register">
                                        <Button size="lg" variant="primary" className="me-3 shadow hover-lift">
                                            Get Started Free <FaArrowRight className="ms-2" />
                                        </Button>
                                    </Link>
                                    <Link to="/login">
                                        <Button size="lg" variant="outline-secondary" className="hover-lift">
                                            Sign In
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div className="mt-4 d-flex align-items-center text-muted">
                            <FaStar className="text-warning me-2" />
                            <span>Join 10,000+ learners organizing their knowledge</span>
                        </div>
                    </Col>
                    <Col lg={6} className="d-none d-lg-block">
                        <div className="hero-illustration position-relative">
                            <div className="illustration-bg"></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default HeroSection;