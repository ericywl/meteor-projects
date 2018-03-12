import React from "react";

const Stats = props => (
    <div>
        <h3 className="player__name">{props.player.name}</h3>
        <p className="player__stats">
            {props.player.position}
            {" place: "}
            {props.player.score} {props.pointStr}.
        </p>
    </div>
);

export default Stats;
