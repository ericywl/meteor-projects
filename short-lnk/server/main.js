import { Meteor } from "meteor/meteor";

import { LinksDB } from "../imports/api/linksDB";
import "../imports/api/users";
import "../imports/startup/simpl-schema-config";

Meteor.startup(() => {
    // code to run on server at startup
    WebApp.connectHandlers.use((req, res, next) => {
        const _id = req.url.slice(1);
        const link = LinksDB.findOne({ _id });

        // link cannot be found in the database
        if (!link) {
            next();
            return;
        }

        // set status code and location header
        res.statusCode = 302;
        res.setHeader("Location", link.url);
        // end request
        res.end();
        Meteor.call("linksTrackVisit", _id);
    });
});
