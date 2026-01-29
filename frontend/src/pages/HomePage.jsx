import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from 'react-bootstrap'
import { 
    FaBook, 
    FaUsers, 
    FaLightbulb, 
    FaRocket, 
    FaArrowRight,
    FaCheckCircle 
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';


const Homepage = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <Container>
                    <Row className="align-items-center min-vh-100">
                        <Col lg={6} className="hero-content">
                            <div className="badge-pill mb-4">
                                <FaLightbulb className="me-2" />
                                Your Personal Reading Companion
                            </div>
                            <h1 className="display-3 fw-bold mb-4">
                                Organize Your Reading,
                                <span className="gradient-text"> Amplify Your Learning</span>
                            </h1>
                            <p className="lead mb-4 text-muted">
                                Create curated reading lists, collaborate with others, and track your 
                                intellectual journey. From casual browsing to serious research, we've got you covered.
                            </p>
                            <div className="cta-buttons">
                                {isAuthenticated ? (
                                    <Link to="/dashboard">
                                        <Button size="lg" variant="primary" className="me-3">
                                            Go to Dashboard <FaArrowRight className="ms-2" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link to="/register">
                                            <Button size="lg" variant="primary" className="me-3">
                                                Get Started Free <FaArrowRight className="ms-2" />
                                            </Button>
                                        </Link>
                                        <Link to="/login">
                                            <Button size="lg" variant="outline-secondary">
                                                Sign In
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </Col>
                        <Col lg={6} className="d-none d-lg-block">
                            <div className="hero-illustration">
                                <div className="floating-card card-1">
                                    <FaBook size={40} className="text-primary" />
                                    <p className="mb-0 mt-2 fw-semibold">250+ Resources</p>
                                </div>
                                <div className="floating-card card-2">
                                    <FaUsers size={40} className="text-success" />
                                    <p className="mb-0 mt-2 fw-semibold">Collaborate</p>
                                </div>
                                <div className="floating-card card-3">
                                    <FaRocket size={40} className="text-warning" />
                                    <p className="mb-0 mt-2 fw-semibold">Track Progress</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
                        <p className="lead text-muted">
                            Powerful features to organize and manage your reading materials
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <FaBook size={40} className="text-primary" />
                                    </div>
                                    <h5 className="fw-bold mb-3">Curated Topics</h5>
                                    <p className="text-muted">
                                        Create and organize topics by interest. Keep your reading material 
                                        perfectly categorized.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <FaUsers size={40} className="text-success" />
                                    </div>
                                    <h5 className="fw-bold mb-3">Collaborate</h5>
                                    <p className="text-muted">
                                        Share topics with friends and colleagues. Build knowledge together 
                                        through shared resources.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <FaCheckCircle size={40} className="text-info" />
                                    </div>
                                    <h5 className="fw-bold mb-3">Track Progress</h5>
                                    <p className="text-muted">
                                        Mark resources as read, rate them, and keep track of your 
                                        learning journey.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <FaLightbulb size={40} className="text-warning" />
                                    </div>
                                    <h5 className="fw-bold mb-3">Discover</h5>
                                    <p className="text-muted">
                                        Browse trending topics and discover what others are reading 
                                        in your areas of interest.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">How It Works</h2>
                        <p className="lead text-muted">
                            Get started in three simple steps
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={4}>
                            <div className="text-center">
                                <div className="step-number mb-3">1</div>
                                <h4 className="fw-bold mb-3">Create Your Topics</h4>
                                <p className="text-muted">
                                    Start by creating topics that match your interests or research areas. 
                                    Make them public or keep them private.
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <div className="step-number mb-3">2</div>
                                <h4 className="fw-bold mb-3">Add Resources</h4>
                                <p className="text-muted">
                                    Add links, upload documents, and build your reading list. 
                                    Everything in one organized place.
                                </p>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="text-center">
                                <div className="step-number mb-3">3</div>
                                <h4 className="fw-bold mb-3">Collaborate & Learn</h4>
                                <p className="text-muted">
                                    Invite others to contribute, share knowledge, and track your 
                                    progress together.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5">
                <Container>
                    <Card className="cta-card border-0 shadow-lg">
                        <Card.Body className="p-5 text-center">
                            <h2 className="display-5 fw-bold mb-4">
                                Ready to Start Your Reading Journey?
                            </h2>
                            <p className="lead text-muted mb-4">
                                Join thousands of learners organizing their knowledge
                            </p>
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <Button size="lg" variant="primary">
                                        Go to Dashboard <FaArrowRight className="ms-2" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link to="/register">
                                    <Button size="lg" variant="primary">
                                        Get Started Free <FaArrowRight className="ms-2" />
                                    </Button>
                                </Link>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </section>

            {/* Footer */}
            <footer className="footer py-4 bg-dark text-white">
                <Container>
                    <Row>
                        <Col md={6}>
                            <h5 className="fw-bold mb-3">
                                <FaBook className="me-2" />
                                ReadingList
                            </h5>
                            <p className="text-muted">
                                Your personal reading companion for organized learning.
                            </p>
                        </Col>
                        <Col md={6} className="text-md-end">
                            <p className="text-muted mb-0">
                                &copy; {new Date().getFullYear()} ReadingList. All rights reserved.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </footer>
        </div>
    );
};


export default Homepage;