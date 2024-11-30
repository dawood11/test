export const login = async (username: string, password: string): Promise<boolean> => {
    const endpoint = username === 'admin' ? '/admin/login' : '/login';
    
    try {
        const response = await fetch(`http://localhost:3000${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include',
        });

        return response.ok;
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
};

export const register = async (username: string, password: string): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        return response.ok;
    } catch (error) {
        console.error("Error during registration:", error);
        return false;
    }
};

export const logout = async (): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include',
        });

        return response.ok;
    } catch (error) {
        console.error("Error during logout:", error);
        return false;
    }
};

export const isAdmin = async (): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/verify-token', {
            method: 'GET',
            credentials: 'include', 
        });
        if (!response.ok) return false;
        const data = await response.json();
        return data.isAdmin === true;
    } catch (error) {
        console.error("Error verifying admin status:", error);
        return false;
    }
};

export const isUserLoggedIn = async (): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:3000/verify-token", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) return false;
      const data = await response.json();
      return !!data.username;
    } catch (error) {
      console.error("Error checking login status:", error);
      return false;
    }
  };