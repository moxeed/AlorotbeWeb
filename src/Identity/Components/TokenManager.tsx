import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { IdentityContext } from "../../App";
import { GetToken, SetToken, SignOut } from "../../Services/Identity";

export const TokenManager = () => {
  const { isAuthenticated, token, setToken } = useContext(IdentityContext);

  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!init) return;
    if (isAuthenticated) SetToken(token as string);
    else SignOut();
  }, [token]);

  useEffect(() => {
    setToken(GetToken());
    setInit(true);
  }, []);

  return null;
};
