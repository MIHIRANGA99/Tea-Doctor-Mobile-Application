import React, { useEffect, useState } from "react";
import { auth } from "../config";
import { User } from "firebase/auth";

const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
};

export default useCurrentUser;
