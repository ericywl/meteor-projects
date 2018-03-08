import React from "react";
import PropTypes from "prop-types";

const LinksHeader = props => {
    return (
        <div className="header">
            <div className="header__content">
                <h1 className="header__title">{props.title}</h1>
                <button
                    className="button button--title"
                    onClick={() => Accounts.logout()}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

LinksHeader.propTypes = {
    title: PropTypes.string.isRequired
};

export default LinksHeader;
