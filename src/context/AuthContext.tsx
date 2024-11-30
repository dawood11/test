// Autentiseringskontekst for å håndtere innloggingsstatus globalt
import { createContext, useState, useContext, ReactNode } from 'react';

// Type-definisjon for autentiseringskonteksten
type AuthContextType = {
    isAuthenticated: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Type-definisjon for AuthProvider props
type AuthProviderProps = {
    children: ReactNode;
};

// Provider-komponent som gir tilgang til autentiseringsstatus
export const AuthProvider = ({ children}: AuthProviderProps) => {
    // Tilstandshåndtering for innloggingsstatus
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Innloggingsfunksjon som sjekker brukernavn og passord
    const login = (username: string, password: string) => {
        if (username === 'admin' && password === 'admin') {
            setIsAuthenticated(true);
            return true;
        }
        return false;
    }

    // Utloggingsfunksjon som nullstiller autentiseringsstatus
    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// Hook for enkel tilgang til autentiseringskonteksten
export const useAuth = () => {
    const context =  useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
