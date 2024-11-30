import React, { useState, ReactNode } from 'react';
import { UserContext } from './UserContext';

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        return storedLoginState === 'true';
    });
    const [username, setUsername] = useState<string | null>(() => {
        return localStorage.getItem('username');
    });
    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        return localStorage.getItem('isAdmin') === 'true';
    });
    

    const login = (username: string, isAdmin:boolean) => {
        setIsLoggedIn(true);
        setUsername(username);
        setIsAdmin(isAdmin);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('isAdmin', String(isAdmin));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUsername(null);
        setIsAdmin(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, username, isAdmin, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};