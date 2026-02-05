import { Container, Row, Col } from 'react-bootstrap';

const HowItWorksSection = () => {
    const steps = [
        {
            number: 1,
            title: "Create Your Topics",
            description: "Start by creating topics that match your interests or research areas. Make them public or keep them private."
        },
        {
            number: 2,
            title: "Add Resources",
            description: "Add links, upload documents, and build your reading list. Everything in one organized place."
        },
        {
            number: 3,
            title: "Collaborate & Learn",
            description: "Invite others to contribute, share knowledge, and track your progress together."
        }
    ];

    return (
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
                    
                    {steps.map((step) => (
                        <Col md={4} key={step.number}>
                            <div className="text-center">
                                <div className="step-number mb-3">{step.number}</div>
                                <h4 className="fw-bold mb-3">{step.title}</h4>
                                <p className="text-muted">{step.description}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default HowItWorksSection;