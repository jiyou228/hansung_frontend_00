import isLogin from "./isLogin";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isLogin() ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
