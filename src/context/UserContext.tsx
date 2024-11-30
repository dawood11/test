import { createContext } from 'react';

interface UserContextType {
    isLoggedIn: boolean;
    username: string | null;
    isAdmin: boolean;
    login: (username: string, isAdmin:boolean) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);