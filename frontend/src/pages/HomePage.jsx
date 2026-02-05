import { useAuth } from '../context/AuthContext';
import HomeNavbar from '../components/home/HomeNavbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/home/Footer';
import './HomePage.css';

const Homepage = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="homepage">
            <HomeNavbar isAuthenticated={isAuthenticated} user={user} />
            <HeroSection isAuthenticated={isAuthenticated} />
            <FeaturesSection />
            <HowItWorksSection />
            <CTASection isAuthenticated={isAuthenticated} />
            <Footer />
        </div>
    );
};

export default Homepage;