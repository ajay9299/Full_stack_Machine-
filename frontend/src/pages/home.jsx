import React, { useEffect } from 'react'
import "../App.css"
import NavbarComponent from '../components/NavbarComponent'
import TokenChecker from '../hooks/tokenChecker'
import { useNavigate } from "react-router-dom"

const HomePage = () => {

    const { hasToken } = TokenChecker();
    const navigate = useNavigate();

    // Check user is logged in or not, If logged in then navigate to product route
    useEffect(() => {
        const isUserLoggedIn = hasToken();
        if (isUserLoggedIn) navigate("/product");
    }, [])

    return (
        <>
                <NavbarComponent isHomePage={true} />
            
        </>
    )
}

export default HomePage
