import React from "react";
import styled from "styled-components";

import TitleBar from "./TitleBar";
import PlayerList from "./PlayerList/index";
import AddPlayer from "./AddPlayer";
import "../startup/sc-start";

const Wrapper = styled.div`
    margin: 0 auto;
    max-width: 50rem;
    padding: 1.3rem;
`;

export default class App extends React.Component {
    render() {
        return (
            <div>
                <TitleBar
                    title={this.props.title}
                    subtitle={this.props.subtitle}
                />
                <Wrapper>
                    <PlayerList players={this.props.players} />
                    <AddPlayer />
                </Wrapper>
            </div>
        );
    }
}
