import { Meteor } from "meteor/meteor";

import "../imports/api/links";
import "../imports/api/users";
import "../imports/startup/simpl-schema-config";

Meteor.startup(() => {
    // code to run on server at startup
    WebApp.connectHandlers.use(() => {
        console.log("custom middleware");
    });
});
