import React from "react";
import { Route, Redirect } from "react-router-dom";


const UnauthRoute = ({ component: Component, ...rest }) => {

    const isLogin = localStorage.getItem('user')
    return (
        <Route
            {...rest}
            render={(props) =>
                !isLogin ? <Component {...props} /> : <Redirect to="/dashboard" />
            }
        />
    );
};
export default UnauthRoute;