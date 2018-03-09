import React from "react";
import { Redirect, Route } from "react-router-dom";

const NoteRoute = ({
    component: Component,
    isAuth,
    computedMatch,
    ...rest
}) => {
    const renderFunc = props => {
        if (!isAuth) {
            return (
                <Redirect
                    to={{ pathname: "/", state: { from: props.location } }}
                />
            );
        }

        if (!computedMatch.params.id) {
            return (
                <Redirect
                    to={{
                        pathname: "/dashboard",
                        state: { from: props.location }
                    }}
                />
            );
        }

        Session.set("selectedNoteId", computedMatch.params.id);
        return <Component {...props} />;
    };

    return <Route {...rest} render={renderFunc} />;
};

export default NoteRoute;
