import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link,useNavigate} from 'react-router-dom';
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiMachineGun } from "react-icons/gi";
import { BiSupport } from "react-icons/bi";
import { FiSettings,FiLogOut } from "react-icons/fi";
import { MdOutlineFreeCancellation } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


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
                    <Navbar.Brand><img  className= "" src=""></img> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {
                                userData ?
                                <>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/machinery"> <GiMachineGun /> Machinery </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/workers"><FaRegCalendarAlt /> Workers</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/supportmaneger"><BiSupport/> Support</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/settings"><FiSettings/> Settings</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/leave"><MdOutlineFreeCancellation/> Leave</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/profile"><CgProfile/> Profile</Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="navbar-brand nav-btn-hover" to="/register">Register</Link>
                                    </li>
                                </>
                            }
                        </Nav>
                        {   
                            userData ?
                            <Nav>
                                {/* <NavDropdown title={user && user.access} id="basic-nav-dropdown"> */}
                                    <NavDropdown.Item  className="navbar-brand nav-btn-hoveron" onClick={logout}><FiLogOut/> Logout</NavDropdown.Item>
                                {/* </NavDropdown> */}
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