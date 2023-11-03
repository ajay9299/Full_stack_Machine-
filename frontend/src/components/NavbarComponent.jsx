import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Models from './Model';
import Login from './LogIn';
import SignUp from './SignUp';
import TokenChecker from '../hooks/tokenChecker';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = (props) => {
    const { isHomePage, userName } = props
    const { removeTokenFromLocalStorage } = TokenChecker()
    const navigate = useNavigate()

    const [showLogInModal, setShowLogInModal] = useState(false);
    const [showSignUpModal, setShowSignUpModal] = useState(false);

    const handleLogInClick = () => {
        setShowLogInModal(true);
    };

    const handleSignUpClick = () => {
        setShowSignUpModal(true);
    };

    const handleCloseModals = () => {
        setShowLogInModal(false);
        setShowSignUpModal(false);
    };

    const handelLogout = () => {
        removeTokenFromLocalStorage()
        navigate("/")


    }

    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container fluid>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div>
                            <Navbar.Brand>
                                <img
                                    src="logo192.png"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="Logo"
                                />
                            </Navbar.Brand>
                            <Navbar.Brand className="text-warning">FullStack Machine</Navbar.Brand>
                        </div>
                        <div></div>
                        {isHomePage ? <div>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ms-auto">
                                    <Button variant="outline-success" className="me-2" onClick={handleLogInClick}>
                                        Login
                                    </Button>
                                    <Button variant="primary" onClick={handleSignUpClick}>Sign Up</Button>
                                </Nav>
                            </Navbar.Collapse>
                        </div> :
                            <div>
                                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Navbar.Brand className="text-warning">{userName}</Navbar.Brand>
                                    <Nav className="ms-auto">
                                        <Button variant="danger" className="me-2" onClick={handelLogout}>
                                            LogOut
                                        </Button>

                                    </Nav>
                                </Navbar.Collapse>
                            </div>}

                    </div>
                </Container>
            </Navbar>
            <Models
                show={showLogInModal}
                handleClose={handleCloseModals}
                title="LogIn"
                body={<Login closeModel={handleCloseModals} />}
            />
            <Models
                show={showSignUpModal}
                handleClose={handleCloseModals}
                title="SignUp "
                body={<SignUp closeModel={handleCloseModals} />}
            />
        </>
    );
};

export default NavbarComponent;