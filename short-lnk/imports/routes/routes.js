import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";
import history from "../api/history";
import Links from "../ui/Links";

const unauthPages = ["/", "/signup"];
const authPages = ["/links"];

const PublicRoute = ({ component: Component, isAuth, ...rest }) => {
    const renderFunc = props => {
        // check if user is trying to access page that doesn't require auth
        const onUnauthPage = unauthPages.includes(props.location.pathname);

        if (isAuth && onUnauthPage) {
            return (
                <Redirect
                    to={{ pathname: "/links", state: { from: props.location } }}
                />
            );
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={renderFunc} />;
};

const PrivateRoute = ({ component: Component, isAuth, ...rest }) => {
    const renderFunc = props => {
        // check if user is trying to access page that requires auth
        const onAuthPage = authPages.includes(props.location.pathname);

        if (!isAuth && onAuthPage) {
            return (
                <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                />
            );
        }

        return <Component {...props} />;
    };

    return <Route {...rest} render={renderFunc} />;
};

export const getRoutes = isAuthenticated => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/"
                        isAuth={isAuthenticated}
                        component={Login}
                    />

                    <PublicRoute
                        path="/signup"
                        isAuth={isAuthenticated}
                        component={Signup}
                    />

                    <PrivateRoute
                        path="/links"
                        isAuth={isAuthenticated}
                        component={Links}
                    />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
};
