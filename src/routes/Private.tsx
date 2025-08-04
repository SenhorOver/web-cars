import { useContext, type JSX } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";

interface PrivateProps {
  children: React.ReactNode;
}

export function Private({
  children,
}: PrivateProps): JSX.Element | React.ReactNode {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to={"/login"} />;
  }

  return children;
}
