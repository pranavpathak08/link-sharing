import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useDashboardData } from "../hooks/useDashboardData";
import AppNavbar from "../components/shared/AppNavbar";
import MyTopicsSidebar from "../components/dashboard/MyTopicsSidebar";
import TrendingTopicsSidebar from "../components/dashboard/TrendingTopicsSidebar";
import CreateTopicCard from "../components/dashboard/CreateTopicCard";
import FeedSection from "../components/dashboard/FeedSection";
import CreateTopicModal from "../components/CreateTopicModal";
import AdminDashboard from "../components/admin/AdminDashboard";
import './Dashboard.css';

const Dashboard = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showCreateModal, setShowCreateModal] = useState(false);

    const {
        subscriptions,
        trendingTopics,
        readingItems,
        loading,
        error,
        handleToggleReadStatus,
        refreshData
    } = useDashboardData();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleTopicClick = (topicId) => {
        navigate(`/topic/${topicId}`);
    };

    const handleCreateTopicSuccess = () => {
        setShowCreateModal(false);
        refreshData();
    };

    // Show admin dashboard for admin users
    if (user?.admin) {
        return <AdminDashboard user={user} />;
    }

    // Regular User Dashboard
    return (
        <div className="dashboard-page">
            <AppNavbar />

            <Container fluid className="dashboard-container py-4">
                <Row className="g-4">
                    {/* Left Sidebar - My Topics */}
                    <Col lg={3} className="sidebar-left">
                        <MyTopicsSidebar
                            subscriptions={subscriptions}
                            loading={loading}
                            onTopicClick={handleTopicClick}
                        />
                    </Col>

                    {/* Center Feed */}
                    <Col lg={6}>
                        <CreateTopicCard
                            user={user}
                            onCreateClick={() => setShowCreateModal(true)}
                        />

                        <FeedSection
                            loading={loading}
                            error={error}
                            readingItems={readingItems}
                            onTopicClick={handleTopicClick}
                            onToggleRead={handleToggleReadStatus}
                            onCreateTopicClick={() => setShowCreateModal(true)}
                        />
                    </Col>

                    {/* Right Sidebar - Trending Topics */}
                    <Col lg={3} className="sidebar-right">
                        <TrendingTopicsSidebar
                            trendingTopics={trendingTopics}
                            loading={loading}
                            onTopicClick={handleTopicClick}
                        />
                    </Col>
                </Row>
            </Container>

            {/* Create Topic Modal */}
            <CreateTopicModal 
                show={showCreateModal}
                onHide={() => setShowCreateModal(false)}
                onSuccess={handleCreateTopicSuccess}
            />
        </div>
    );
};

export default Dashboard;