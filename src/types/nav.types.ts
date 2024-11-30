import { ReactNode } from "react";

export interface NavLinkType {
    name: string;
    href: string;
}

export interface NavContextType {
    navLinks: NavLinkType [];
    setNavLinks: React.Dispatch<React.SetStateAction<NavLinkType[]>>
}

export interface NavContextProps {
    currentPath: string;
    setCurrentPath: (path:string) => void;

}

export interface NavProviderProps {
    children: ReactNode;
}