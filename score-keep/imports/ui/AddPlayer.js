import React from "react";
import styled from "styled-components";

import { Players } from "../api/players";

import Button from "../components/Button";

const Form = styled.form`
    display: flex;
`;

export default class AddPlayer extends React.Component {
    static handleSubmit(event) {
        let playerName = event.target.playerName.value;
        event.preventDefault();

        if (playerName) {
            event.target.playerName.value = "";
            Players.insert({
                name: playerName,
                score: 0
            });
        }
    }

    render() {
        return (
            <div className="item">
                <Form onSubmit={AddPlayer.handleSubmit.bind(this)}>
                    <input
                        className="form__input"
                        type="text"
                        name="playerName"
                        placeholder="Player name"
                    />
                    <Button>Add player</Button>
                </Form>
            </div>
        );
    }
}
