import React from "react";
import ReactDOM from "react-dom";

import { getRoutes, onAuthChange } from "../imports/routes/routes";
import "../imports/startup/simpl-schema-config";

Meteor.startup(() => {
    Tracker.autorun(() => {
        const isAuthenticated = !!Meteor.userId();
        onAuthChange(isAuthenticated);

        const routes = getRoutes(isAuthenticated);
        ReactDOM.render(routes, document.getElementById("render-target"));
    });
});

