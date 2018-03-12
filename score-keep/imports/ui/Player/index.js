import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Players } from "../../api/players";
import Stats from "./Stats";
import Actions from "./Actions";
import * as variables from "../../components/variables";

const Wrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    background: ${props => bgHandler(props.rank)};
    border: 1px solid ${props => borderHandler(props.rank)};
    margin: 1.3rem;
    padding: 1.3rem;
`;

const bgHandler = rank => {
    switch (rank) {
        case 1:
            return variables.ITEM_GREEN;
        case 2:
            return variables.ITEM_BLUE;
        case 3:
            return variables.ITEM_RED;
        default:
            return "white";
    }
};

const borderHandler = rank => {
    switch (rank) {
        case 1:
            return variables.ITEM_GREEN_DARK;
        case 2:
            return variables.ITEM_BLUE_DARK;
        case 3:
            return variables.ITEM_RED_DARK;
        default:
            return "e8e8e8";
    }
};

export default class Player extends React.Component {
    render() {
        let pointStr = this.props.player.score === 1 ? "point" : "points";

        return (
            <Wrapper rank={this.props.player.rank} key={this.props.player._id}>
                <Stats player={this.props.player} pointStr={pointStr} />
                <Actions player={this.props.player} playersDB={Players} />
            </Wrapper>
        );
    }
}

Player.propTypes = {
    player: PropTypes.object.isRequired
};
