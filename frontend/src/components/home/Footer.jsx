import { Container, Row, Col } from 'react-bootstrap';
import { FaBook, FaGithub, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer py-5 bg-dark text-white">
            <Container>
                <Row className="g-4">
                    <Col md={4}>
                        <h5 className="fw-bold mb-3 d-flex align-items-center">
                            <FaBook className="me-2" />
                            ChirpX
                        </h5>
                        <p className="text-light opacity-75">
                            Your personal reading companion for organized learning and knowledge management.
                        </p>
                        <div className="social-links mt-3">
                            <a href="#" className="text-white me-3" aria-label="GitHub">
                                <FaGithub size={24} />
                            </a>
                            <a href="#" className="text-white me-3" aria-label="Twitter">
                                <FaTwitter size={24} />
                            </a>
                        </div>
                    </Col>
                    <Col md={2}>
                        <h6 className="fw-bold mb-3">Product</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#features" className="text-light opacity-75 text-decoration-none">
                                    Features
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#how-it-works" className="text-light opacity-75 text-decoration-none">
                                    How It Works
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Pricing
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h6 className="fw-bold mb-3">Company</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    About
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Blog
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h6 className="fw-bold mb-3">Legal</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Privacy
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Terms
                                </a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <h6 className="fw-bold mb-3">Support</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    Help Center
                                </a>
                            </li>
                            <li className="mb-2">
                                <a href="#" className="text-light opacity-75 text-decoration-none">
                                    FAQ
                                </a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <hr className="my-4 opacity-25" />
                <Row>
                    <Col className="text-center text-light opacity-75">
                        <p className="mb-0">
                            &copy; {currentYear} ChirpX. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;