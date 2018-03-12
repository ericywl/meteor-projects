import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Button from "../../components/Button";

const RoundButton = Button.extend`
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
`;

const Wrapper = styled.div`
    flex-shrink: 0;
`;

export default (Actions = props => (
    <Wrapper>
        <RoundButton
            onClick={() => {
                props.playersDB.update(props.player._id, {
                    $inc: { score: -1 }
                });
            }}
        >
            -1
        </RoundButton>

        <RoundButton
            round
            onClick={() => {
                props.playersDB.update(props.player._id, {
                    $inc: { score: 1 }
                });
            }}
        >
            +1
        </RoundButton>

        <RoundButton
            round
            onClick={() => {
                props.playersDB.remove(props.player._id);
            }}
        >
            X
        </RoundButton>
    </Wrapper>
));

Actions.propTypes = {
    playersDB: PropTypes.object.isRequired
};
