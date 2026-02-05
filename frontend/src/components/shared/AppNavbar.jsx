import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaUser, FaSignOutAlt, FaCog, FaQq, FaArrowLeft } from 'react-icons/fa'
import { useAuth } from "../../../src/context/AuthContext.jsx"

const AppNavbar = ({showBackButton = false, onBackClick = null}) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const backToHomePage = () => {
        navigate('/');
    }

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    const getInitials = (firstName, lastName) => {
        return `${ firstName?.[0] || '' }${ lastName?.[0] || '' }`.toUpperCase();
    }

    return (
        <Navbar bg="white" expand="lg" className="shadow sm sticky-top">
            <Container fluid>
                <Navbar.Brand className="fw-bold gradient-text d-flex align-items-center">
                    { showBackButton && onBackClick && (
                        <button
                            onClick={ backToHomePage }
                            className="btn btn-link text-decoration-none p-0 me-3 text-muted"
                            aria-label="Go back"
                        >
                            <FaArrowLeft />
                        </button>
                    ) }
                    <FaQq className='text-primary me-2' size={28}/> 
                    ChirpX
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <Nav className="ms-auto align-items-center">
                        <NavDropdown
                            title={
                                <span className="nav-dropdown">
                                    <div className="user-avatar d-inline-flex align-items-center justify-content-center me-2">
                                        <div className="avatar-circle small">
                                            {getInitials(user?.firstName, user?.lastName)}
                                        </div>
                                    </div>
                                    {user?.firstName} {user?.lastName}
                                </span>
                            }
                            id="user-dropdown"
                            align="end"
                        >
                            <NavDropdown.Item onClick={() => navigate('/dashboard')}>
                                <FaUser className="me-2" />
                                Dashboard
                            </NavDropdown.Item>
                            <NavDropdown.Item>
                                <FaBook className="me-2" />
                                My Topics
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item>
                                <FaCog className="me-2" />
                                Settings
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout} className="text-danger">
                                <FaSignOutAlt className="me-2" />
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}  

export default AppNavbar;