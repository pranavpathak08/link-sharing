import { Container, Row, Col } from 'react-bootstrap';
import { FaBook, FaUsers, FaCheckCircle, FaLightbulb } from 'react-icons/fa';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
    const features = [
        {
            icon: FaBook,
            title: "Curated Topics",
            description: "Create and organize topics by interest. Keep your reading material perfectly categorized.",
            bgColor: "bg-primary-subtle",
            iconColor: "text-primary"
        },
        {
            icon: FaUsers,
            title: "Collaborate",
            description: "Share topics with friends and colleagues. Build knowledge together through shared resources.",
            bgColor: "bg-success-subtle",
            iconColor: "text-success"
        },
        {
            icon: FaCheckCircle,
            title: "Track Progress",
            description: "Mark resources as read, rate them, and keep track of your learning journey.",
            bgColor: "bg-info-subtle",
            iconColor: "text-info"
        },
        {
            icon: FaLightbulb,
            title: "Discover",
            description: "Browse trending topics and discover what others are reading in your areas of interest.",
            bgColor: "bg-warning-subtle",
            iconColor: "text-warning"
        }
    ];

    return (
        <section id="features" className="features-section py-5 bg-light">
            <Container>
                <div className="text-center mb-5">
                    <h2 className="display-5 fw-bold mb-3">Everything You Need</h2>
                    <p className="lead text-muted">
                        Powerful features to organize and manage your reading materials
                    </p>
                </div>

                <Row className="g-4">
                    {features.map((feature, index) => (
                        <Col md={6} lg={3} key={index}>
                            <FeatureCard {...feature} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
};

export default FeaturesSection;