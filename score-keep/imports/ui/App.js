import React from 'react';

import TitleBar from "./TitleBar";
import PlayerList from "./PlayerList";
import AddPlayer from "./AddPlayer";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <TitleBar title={this.props.title} subtitle={this.props.subtitle}/>
                <PlayerList players={this.props.players}/>
                <AddPlayer/>
            </div>
        );
    }
}