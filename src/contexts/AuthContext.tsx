import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextData {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ name, email, uid }: UserProps) => void;
  user: UserProps | null;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // signed User
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoadingAuth(false);
      } else {
        // no signed User
        setUser(null);
        setLoadingAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handleInfoUser({ name, email, uid }: UserProps) {
    setUser({
      name: name,
      email: email,
      uid: uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, loadingAuth, handleInfoUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
