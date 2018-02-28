import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";

import { Players } from "../imports/api/players";
import TitleBar from "../imports/ui/TitleBar";
import AddPlayer from "../imports/ui/AddPlayer";

const renderPlayers = function(playersList) {
    return playersList.map(player => {
        let pointStr = player.score === 1 ? "point" : "points";
        return (
            <p key={player._id}>
                {player.name} has {player.score} {pointStr}.
                <button onClick={() => decScore(player._id)}>-1</button>
                <button onClick={() => incScore(player._id)}>+1</button>
                <button onClick={() => deletePlayer(player._id)}>X</button>
            </p>
        );
    });
};

const deletePlayer = playerId => Players.remove({ _id: playerId });

const incScore = playerId => {
    Players.update(
        { _id: playerId },
        {
            $inc: { score: 1 }
        }
    );
};

const decScore = playerId => {
    Players.update(
        { _id: playerId },
        {
            $inc: { score: -1 }
        }
    );
};

Meteor.startup(() => {
    let title = "Score Keep";
    let subtitle = "created by Eric";

    Tracker.autorun(() => {
        let players = Players.find().fetch();
        let jsx = (
            <div>
                <TitleBar title={title} subtitle={subtitle} />
                {renderPlayers(players)}

                <AddPlayer />
            </div>
        );
        ReactDOM.render(jsx, document.getElementById("app"));
    });
});
