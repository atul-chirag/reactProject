import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link,useNavigate} from 'react-router-dom';
const Header = () => {

    const Navigate  = useNavigate();
    const user      = JSON.parse(localStorage.getItem('user_info'));
    const userData  = localStorage.getItem('user_info');
    function logout()
    {
            localStorage.clear();
            Navigate("/login");
    }
   function profile()
   {
        Navigate("/profile");
   }
    return (
        <div>
            <Navbar className="navbar_brand_nav">
                <Container>
                    <Navbar.Brand  ><img  className="navbar-brand" src="https://dev.cap-tek.com:9004/assets/img/monisol.png" alt="logo" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                userData ?
                                <>
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/list">List</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/update">Update</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand" to="/register">Register</Link>
                                    </li>
                                </>
                            }
                        </Nav>
                        {   
                            userData ?
                            <Nav>
                                <NavDropdown title={user && user.access} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={profile}>My Profile</NavDropdown.Item>
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            :null
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
};

export default Header;