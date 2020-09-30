import React from "react";
import { Route, Redirect } from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const isLogin = localStorage.getItem('user')
    return (
        <Route
            {...rest}
            render={(props) =>
                isLogin ? <Component {...props} /> : <Redirect to="/login" />
            }
        />
    );
};
export default PrivateRoute;
