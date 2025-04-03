import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  username: string;
  initial: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage on initial render
    const username = localStorage.getItem("tileAI_username");
    
    if (username) {
      setUser({
        username,
        initial: username.charAt(0).toUpperCase(),
      });
    }
    
    setIsLoading(false);
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("tileAI_username", user.username);
      localStorage.setItem("tileAI_hasVisited", "true");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
