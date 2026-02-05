import { Card } from 'react-bootstrap';

const FeatureCard = ({ icon: Icon, title, description, bgColor, iconColor }) => {
    return (
        <Card className="feature-card h-100 border-0 shadow-sm hover-lift">
            <Card.Body className="text-center p-4">
                <div className="feature-icon mb-3">
                    <div className={`icon-circle ${bgColor}`}>
                        <Icon size={32} className={iconColor} />
                    </div>
                </div>
                <h5 className="fw-bold mb-3">{title}</h5>
                <p className="text-muted mb-0">{description}</p>
            </Card.Body>
        </Card>
    );
};

export default FeatureCard;