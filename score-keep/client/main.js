import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import App from "../imports/ui/App";
import { Players } from "../imports/api/players";

Meteor.startup(() => {
    const title = "Score Keep";
    // const subtitle = "created by Eric";
    Tracker.autorun(() => {
        let players = Players.find({}, {sort: {score: -1}}).fetch();
        ReactDOM.render(<App title={title}
                             players={players}/>, document.getElementById("app"));
    });
});
