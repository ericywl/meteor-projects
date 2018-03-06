import React from 'react';
import { Accounts } from "meteor/accounts-base";

import LinksList from "./LinksList";

export default class Link extends React.Component {
    onLogout() {
        Accounts.logout();
    }

    onSubmit(event) {
        const url = this.refs.url.value.trim();
        event.preventDefault();

        if (url) {
            Meteor.call("linksInsert", url);
            this.refs.url.value = "";
        }
    }

    render() {
        return (
            <div>
                <h1>Your Links</h1>
                <LinksList/>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="New URL"/>
                    <button>Add Link</button>
                </form>

                <button onClick={this.onLogout.bind(this)}>Log out</button>
            </div>
        );
    }
}