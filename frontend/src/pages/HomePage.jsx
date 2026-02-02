import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap'
import { 
    FaBook, 
    FaUsers, 
    FaLightbulb, 
    FaRocket, 
    FaArrowRight,
    FaCheckCircle,
    FaGithub,
    FaTwitter,
    FaStar
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './HomePage.css';


const Homepage = () => {
    const { isAuthenticated, user } = useAuth();
    return (
        <div className="homepage">
            {/* Navigation */}
            <Navbar bg="white" expand="lg" className="shadow-sm sticky-top">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
                        <FaBook className="me-2 text-primary" size={28} />
                        <span className="gradient-text">ReadingList</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link as={Link} to="#features" className="mx-2">Features</Nav.Link>
                            <Nav.Link as={Link} to="#how-it-works" className="mx-2">How It Works</Nav.Link>
                            {isAuthenticated ? (
                                <>
                                    <Nav.Link as={Link} to="/dashboard" className="mx-2">
                                        Welcome, {user?.firstName}
                                    </Nav.Link>
                                    <Link to="/dashboard">
                                        <Button variant="primary" className="ms-3">
                                            Dashboard
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login" className="mx-2">Sign In</Nav.Link>
                                    <Link to="/register">
                                        <Button variant="primary" className="ms-3">
                                            Get Started
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Hero Section */}
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
                                <div className="floating-card card-1">
                                    <div className="icon-wrapper">
                                        <FaBook size={32} className="text-primary" />
                                    </div>
                                    <p className="mb-0 mt-2 fw-semibold">250+ Resources</p>
                                    <small className="text-muted">Per topic</small>
                                </div>
                                <div className="floating-card card-2">
                                    <div className="icon-wrapper">
                                        <FaUsers size={32} className="text-success" />
                                    </div>
                                    <p className="mb-0 mt-2 fw-semibold">Collaborate</p>
                                    <small className="text-muted">With teams</small>
                                </div>
                                <div className="floating-card card-3">
                                    <div className="icon-wrapper">
                                        <FaRocket size={32} className="text-warning" />
                                    </div>
                                    <p className="mb-0 mt-2 fw-semibold">Track Progress</p>
                                    <small className="text-muted">Visual insights</small>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section py-5 bg-light">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
                        <p className="lead text-muted">
                            Powerful features to organize and manage your reading materials
                        </p>
                    </div>

                    <Row className="g-4">
                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <div className="icon-circle bg-primary-subtle">
                                            <FaBook size={32} className="text-primary" />
                                        </div>
                                    </div>
                                    <h5 className="fw-bold mb-3">Curated Topics</h5>
                                    <p className="text-muted mb-0">
                                        Create and organize topics by interest. Keep your reading material 
                                        perfectly categorized.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <div className="icon-circle bg-success-subtle">
                                            <FaUsers size={32} className="text-success" />
                                        </div>
                                    </div>
                                    <h5 className="fw-bold mb-3">Collaborate</h5>
                                    <p className="text-muted mb-0">
                                        Share topics with friends and colleagues. Build knowledge together 
                                        through shared resources.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <div className="icon-circle bg-info-subtle">
                                            <FaCheckCircle size={32} className="text-info" />
                                        </div>
                                    </div>
                                    <h5 className="fw-bold mb-3">Track Progress</h5>
                                    <p className="text-muted mb-0">
                                        Mark resources as read, rate them, and keep track of your 
                                        learning journey.
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6} lg={3}>
                            <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
                                <Card.Body className="text-center p-4">
                                    <div className="feature-icon mb-3">
                                        <div className="icon-circle bg-warning-subtle">
                                            <FaLightbulb size={32} className="text-warning" />
                                        </div>
                                    </div>
                                    <h5 className="fw-bold mb-3">Discover</h5>
                                    <p className="text-muted mb-0">
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
            <section id="how-it-works" className="how-it-works-section py-5">
                <Container>
                    <div className="text-center mb-5">
                        <h2 className="display-5 fw-bold mb-3">How It Works</h2>
                        <p className="lead text-muted">
                            Get started in three simple steps
                        </p>
                    </div>

                    <Row className="g-4 position-relative">
                        <div className="step-connector d-none d-md-block"></div>
                        
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
            <section className="cta-section py-5 bg-gradient">
                <Container>
                    <Card className="cta-card border-0 shadow-lg bg-white">
                        <Card.Body className="p-5 text-center">
                            <h2 className="display-5 fw-bold mb-4">
                                Ready to Start Your Reading Journey?
                            </h2>
                            <p className="lead text-muted mb-4">
                                Join thousands of learners organizing their knowledge
                            </p>
                            {isAuthenticated ? (
                                <Link to="/dashboard">
                                    <Button size="lg" variant="primary" className="shadow hover-lift">
                                        Go to Dashboard <FaArrowRight className="ms-2" />
                                    </Button>
                                </Link>
                            ) : (
                                <div>
                                    <Link to="/register">
                                        <Button size="lg" variant="primary" className="shadow hover-lift me-3">
                                            Get Started Free <FaArrowRight className="ms-2" />
                                        </Button>
                                    </Link>
                                    <p className="mt-3 text-muted">No credit card required • Free forever</p>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Container>
            </section>

            {/* Footer */}
            <footer className="footer py-5 bg-dark text-white">
                <Container>
                    <Row className="g-4">
                        <Col md={4}>
                            <h5 className="fw-bold mb-3 d-flex align-items-center">
                                <FaBook className="me-2" />
                                ReadingList
                            </h5>
                            <p className="text-light opacity-75">
                                Your personal reading companion for organized learning and knowledge management.
                            </p>
                            <div className="social-links mt-3">
                                <a href="#" className="text-white me-3">
                                    <FaGithub size={24} />
                                </a>
                                <a href="#" className="text-white me-3">
                                    <FaTwitter size={24} />
                                </a>
                            </div>
                        </Col>
                        <Col md={2}>
                            <h6 className="fw-bold mb-3">Product</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#features" className="text-light opacity-75 text-decoration-none">Features</a></li>
                                <li className="mb-2"><a href="#how-it-works" className="text-light opacity-75 text-decoration-none">How It Works</a></li>
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Pricing</a></li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <h6 className="fw-bold mb-3">Company</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">About</a></li>
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Blog</a></li>
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Contact</a></li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <h6 className="fw-bold mb-3">Legal</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Privacy</a></li>
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Terms</a></li>
                            </ul>
                        </Col>
                        <Col md={2}>
                            <h6 className="fw-bold mb-3">Support</h6>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">Help Center</a></li>
                                <li className="mb-2"><a href="#" className="text-light opacity-75 text-decoration-none">FAQ</a></li>
                            </ul>
                        </Col>
                    </Row>
                    <hr className="my-4 opacity-25" />
                    <Row>
                        <Col className="text-center text-light opacity-75">
                            <p className="mb-0">
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