import React from "react";

import { Links } from "../api/links";

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        console.log("LinksList componentDidMount");
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("linksPub");
            const links = Links.find().fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        console.log("LinksList componentWillUnmount");
        this.linksTracker.stop();
    }

    renderLinksList() {
        return this.state.links.map((link) => {
            return (
                <li key={link._id}>{link.url}</li>
            );
        });
    }

    render() {
        return (
            <div>
                <div>
                    <ul>{this.renderLinksList()}</ul>
                </div>
            </div>
        );
    }
}