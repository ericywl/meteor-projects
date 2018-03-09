import React from "react";
import ReactDOM from "react-dom";
import { Session } from "meteor/session";
import { Redirect } from "react-router-dom";

import history from "../imports/api/history";
import { getRoutes } from "../imports/routes/routes";
import "../imports/startup/simpl-schema-config";

Tracker.autorun(() => {
    const selectedNoteId = Session.get("selectedNoteId");

    if (selectedNoteId) {
        history.replace(`/dashboard/${selectedNoteId}`);
    }
});

if (Meteor.isClient) {
    Meteor.startup(() => {
        Session.set("selectedNoteId", undefined);
        Session.set("dataLoaded", false);

        Tracker.autorun(() => {
            const isAuthenticated = !!Meteor.userId();
            const routes = getRoutes(isAuthenticated);

            ReactDOM.render(routes, document.getElementById("render-target"));
        });
    });

    Meteor.subscribe("notes", () => Session.set("data_loaded", true));
}
