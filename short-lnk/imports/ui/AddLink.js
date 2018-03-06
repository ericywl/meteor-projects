import React from "react";

export default class AddLink extends React.Component {
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
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="url" placeholder="New URL" />
                    <button>Add Link</button>
                </form>
            </div>
        );
    }
}
