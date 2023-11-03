import { useState } from 'react';

// Custom hook to check and set a token in localStorage
function TokenChecker() {
    // Create a state variable to store the token
    const [token, setToken] = useState(null);

    // Function to set the token in localStorage
    const setTokenToLocalStorage = (newToken) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    // Function to remove the token from localStorage
    const removeTokenFromLocalStorage = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    // Function to check if a token is present
    const hasToken = () => {
        const storedToken = localStorage.getItem('token');
        return storedToken ? true : false
    };

    return { token, setTokenToLocalStorage, removeTokenFromLocalStorage, hasToken };
}

export default TokenChecker;
