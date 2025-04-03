import { useEffect, useState } from "react";
import { useUser } from "./use-user";

export const useWelcome = () => {
  const { user, isLoading } = useUser();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      // Show welcome modal only if user is not set
      setShowWelcome(!user);
    }
  }, [user, isLoading]);

  const closeWelcome = () => {
    setShowWelcome(false);
  };

  return {
    showWelcome,
    closeWelcome,
  };
};
