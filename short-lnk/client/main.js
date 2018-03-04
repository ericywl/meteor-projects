import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Tracker } from "meteor/tracker";

import history from "../imports/api/history";
import Login from "../imports/ui/Login";
import NotFound from "../imports/ui/NotFound";
import Signup from "../imports/ui/Signup";
import Links from "../imports/ui/Links";

const unauthenticatedPages = ["/", "/signup"];
const authenticatedPages = ["/links"];

const PublicRoute = ({component: Component, ...rest}) => {
    const renderFunc = (props) => {
        const onUnauthedPage = unauthenticatedPages.includes(props.location);
        return (
            (!!Meteor.userId() && onUnauthedPage)
                ? <Redirect
                    to={{pathname: "/links", state: {from: props.location}}}/>
                : <Component {...props}/>
        );
    };

    return <Route {...rest} render={renderFunc}/>
};

const PrivateRoute = ({component: Component, ...rest}) => {
    const renderFunc = (props) => {
        const onAuthedPage = authenticatedPages.includes(props.location);
        return (
            (!Meteor.userId() && onAuthedPage)
                ? <Redirect
                    to={{pathname: "/", state: {from: props.location}}}/>
                : <Component {...props}/>
        );
    };

    return <Route {...rest} render={renderFunc}/>
};

const routes = (
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute exact path="/" component={Login}/>
                <PublicRoute path="/signup" component={Signup}/>
                <PrivateRoute path="/links" component={Links}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
    </Router>
);

Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
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
});

Meteor.startup(() => {
    Tracker.autorun(() => {
        ReactDOM.render(routes, document.getElementById("render-target"));
    });
});

