import { Link } from "react-router-dom";
import { Container, Card, Button } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';

const CTASection = ({ isAuthenticated }) => {
    return (
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
    );
};

export default CTASection;