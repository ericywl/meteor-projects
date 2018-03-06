import React from "react";

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
        console.log("LinksList componentDidMount");
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("linksPub");
            const links = LinksDB.find().fetch();
            this.setState({ links });
        });
    }

    componentWillUnmount() {
        console.log("LinksList componentWillUnmount");
        this.linksTracker.stop();
    }

    renderItem() {
        return this.state.links.map((link) => {
            const absUrl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} shortUrl={absUrl} {...link}/>
        });
    }

    render() {
        return (
            <div>
                <div>
                    {this.renderItem()}
                </div>
            </div>
        );
    }
}