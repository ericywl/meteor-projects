import React from "react";
import FlipMove from "react-flip-move";
import { Session } from "meteor/session";

import { LinksDB } from "../api/linksDB";
import LinksListItem from "./LinksListItem";

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }

    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("linksPub");
            const links = LinksDB.find(
                {
                    visible: Session.get("showVisible")
                },
                { sort: { visitedCount: -1 } }
            ).fetch();

            this.setState({ links });
        });
    }

    componentWillUnmount() {
        this.linksTracker.stop();
    }

    renderItem() {
        if (this.state.links.length == 0) {
            return (
                <div className="item">
                    <p className="item__status">No links found.</p>
                </div>
            );
        }

        return this.state.links.map(link => {
            const absUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={absUrl} {...link} />;
        });
    }

    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight="true">
                    {this.renderItem()}
                </FlipMove>
            </div>
        );
    }
}
