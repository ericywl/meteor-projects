import React from "react";
import PropTypes from "prop-types";

const LinksHeader = props => {
    return (
        <div>
            <h1>{props.title}</h1>
            <button onClick={() => Accounts.logout()}>Log out</button>
        </div>
    );
};

LinksHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default LinksHeader;
