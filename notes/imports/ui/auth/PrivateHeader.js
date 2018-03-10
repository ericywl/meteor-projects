import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import history from "../../api/history";

export const PrivateHeader = props => {
    const navImgSrc = props.isNavOpen ? "/images/x.svg" : "/images/bars.svg";

    return (
        <div className="header">
            <div className="header__content">
                <img
                    className="header__nav-toggle"
                    src={navImgSrc}
                    alt="nav"
                    onClick={props.toggleNav}
                />

                <h1
                    className="header__title"
                    onClick={() => history.replace("/dashboard")}
                >
                    {props.title}
                </h1>

                <button
                    className="button button--title"
                    onClick={props.handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    toggleNav: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired
};

export default withTracker(() => {
    return {
        handleLogout: () => Accounts.logout(),
        toggleNav: () => Session.set("isNavOpen", !Session.get("isNavOpen")),
        isNavOpen: Session.get("isNavOpen")
    };
})(PrivateHeader);
