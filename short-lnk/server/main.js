import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import "../imports/api/links";
import "../imports/api/users";
import "../imports/startup/simpl-schema-config";

Meteor.startup(() => {
    // code to run on server at startup
    WebApp.connectHandlers.user(() => {
        console.log("custom middleware");
    });
});
