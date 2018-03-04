import React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import Signup from "../ui/Signup";
import NotFound from "../ui/NotFound";
import Login from "../ui/Login";
import history from "../api/history";
import Links from "../ui/Links";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const PublicRoute = ({component: Component, isAuth, ...rest}) => {
    const renderFunc = (props) => (isAuth)
        ? <Redirect to={{pathname: "/links", state: {from: props.location}}}/>
        : <Component {...props}/>;

    return <Route {...rest} render={renderFunc}/>
};

const PrivateRoute = ({component: Component, isAuth, ...rest}) => {
    const renderFunc = (props) => (!isAuth)
        ? <Redirect to={{pathname: "/", state: {from: props.location}}}/>
        : <Component {...props}/>;

    return <Route {...rest} render={renderFunc}/>
};

export const onAuthChange = (isAuthenticated) => {
    const pathname = history.location.pathname;
    const onUnauthenticatedPage = unauthenticatedPages.includes(pathname);
    const onAuthenticatedPage = authenticatedPages.includes(pathname);

    if (onUnauthenticatedPage && isAuthenticated) {
        /* redirect authenticated users to links if they visit pages that is
         limited to unauthenticated users */
        history.replace("/links");
    } else if (onAuthenticatedPage && !isAuthenticated) {
        /* redirect unauthenticated users to login if they visit pages that
         require authentication */
        history.replace("/");
    }
};

export const getRoutes = (isAuthenticated) => {
    return (
        <Router history={history}>
            <div>
                <Switch>
                    <PublicRoute exact path="/" isAuth={isAuthenticated}
                                 component={Login}/>
                    <PublicRoute path="/signup" isAuth={isAuthenticated}
                                 component={Signup}/>
                    <PrivateRoute path="/links" isAuth={isAuthenticated}
                                  component={Links}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </Router>
    );
};