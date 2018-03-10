import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

export class NoteListEmptyItem extends React.Component {
    render() {
        const searchQuery = this.props.session.get("searchQuery");
        return (
            <div>
                <p className="empty-item">
                    {!searchQuery
                        ? "You have no notes currently."
                        : "No notes found."}
                </p>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        session: Session
    };
})(NoteListEmptyItem);
