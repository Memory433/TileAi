import { useUserContext } from "../context/user-context";

export const useUser = () => {
  const { user, setUser, isLoading } = useUserContext();

  const saveUser = (username: string) => {
    setUser({
      username,
      initial: username.charAt(0).toUpperCase(),
    });
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("tileAI_username");
    localStorage.removeItem("tileAI_hasVisited");
  };

  return {
    user,
    isLoading,
    saveUser,
    clearUser,
  };
};
