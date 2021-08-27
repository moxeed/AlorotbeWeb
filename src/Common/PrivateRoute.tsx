import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { IdentityContext } from "../App";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const { isAuthenticated } = useContext(IdentityContext);

  return isAuthenticated ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/Identity/login" />
  );
};
export default PrivateRoute;
