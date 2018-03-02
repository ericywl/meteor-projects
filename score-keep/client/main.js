import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import App from "../imports/ui/App";
import { Players, calcPlayerPositions } from "../imports/api/players";

Meteor.startup(() => {
    const title = "Score Keep";
    const subtitle = "created by Eric";
    Tracker.autorun(() => {
        let players = Players.find({}, {sort: {score: -1}}).fetch();
        let positionedPlayers = calcPlayerPositions(players);
        ReactDOM.render(<App title={title} subtitle={subtitle}
                             players={positionedPlayers}/>, document.getElementById("app"));
    });
});
