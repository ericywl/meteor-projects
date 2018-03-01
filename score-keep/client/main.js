import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import App from "../imports/ui/App";
import { Players } from "../imports/api/players";

Meteor.startup(() => {
    const title = "Score Keep";
    const subtitle = "created by Eric";
    Tracker.autorun(() => {
        let players = Players.find().fetch();
        ReactDOM.render(<App title={title} subtitle={subtitle}
                             players={players}/>, document.getElementById("app"));
    });
});
