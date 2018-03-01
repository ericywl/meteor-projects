import React from "react";
import PropTypes from "prop-types";

import {Players} from "../api/players";

export default class Player extends React.Component {
    render() {
        let pointStr = this.props.player.score === 1 ? "point" : "points";
        return (
            <p key={this.props.player._id}>
                {this.props.player.name} has {this.props.player.score} {pointStr}.
                <button onClick={() => {
                    Players.update(this.props.player._id, {
                        $inc: {score: -1}
                    });
                }}>-1
                </button>

                <button onClick={() => {
                    Players.update(this.props.player._id, {
                        $inc: {score: 1}
                    });
                }}>+1
                </button>

                <button onClick={() => {
                    Players.remove(this.props.player._id);
                }}>X
                </button>
            </p>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired
};
