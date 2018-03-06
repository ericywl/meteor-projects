import React from "react";
import PropTypes from "prop-types";

export default class LinksHeader extends React.Component {
    onLogout() {
        Accounts.logout();
    }

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <button onClick={this.onLogout.bind(this)}>Log out</button>
            </div>
        );
    }
}

LinksHeader.propTypes = {
    title: PropTypes.string.isRequired
}
