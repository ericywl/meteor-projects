import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Players } from "../imports/api/players";

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

const handleSubmit = event => {
    let playerName = event.target.playerName.value;
    event.preventDefault();

    if (playerName) {
        event.target.playerName.value = "";
        Players.insert({
            name: playerName,
            score: 0
        });
    }
};

class TitleBar extends React.Component {
    render() {
        return (
            <div>
                <h1>My App Name</h1>
            </div>
        );
    }
}

Meteor.startup(() => {
    Tracker.autorun(() => {
        let players = Players.find().fetch();
        let jsx = (
            <div>
                <TitleBar />
                {renderPlayers(players)}

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="playerName"
                        placeholder="Player name"
                    />
                    <button>Add player</button>
                </form>
            </div>
        );
        ReactDOM.render(jsx, document.getElementById("app"));
    });
});
