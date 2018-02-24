import React from "react";
import ReactDOM from "react-dom";
import {Meteor} from "meteor/meteor";

const players = [{
    _id: '1',
    name: "Eric",
    score: 10
}, {
    _id: '2',
    name: "Ayy",
    score: 1
}, {
    _id: '3',
    name: "Andrew",
    score: -14
}];

const renderPlayers = function (playersList) {
    return playersList.map(function (player) {
        let pointStr = (player.score == 1) ? "point" : "points";
        return <p key={player._id}>{player.name} has {player.score} {pointStr}.</p>
    });
};

Meteor.startup(function () {
    let title = "Account Settings";
    let name = "Eric";
    let jsx = (
        <div>
            <h1>{title}</h1>
            <p>Hello {name}!</p>
            <p>Second paragraph here!</p>
            {renderPlayers(players)}
        </div>);
    ReactDOM.render(jsx, document.getElementById("app"));
});