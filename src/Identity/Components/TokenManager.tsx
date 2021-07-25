import { useEffect } from "react";
import { useContext } from "react";
import { IdentityContext } from "../../App";
import { GetToken, SetToken, SignOut } from "../../Services/Identity";

export const TokenManager = () => {
  const { isAuthenticated, token, setToken } = useContext(IdentityContext);

  useEffect(() => {
    if (isAuthenticated) SetToken(token as string);
    else SignOut();
  }, [token, isAuthenticated]);

  useEffect(() => {
    setToken(GetToken());
  }, []);

  return null;
};
