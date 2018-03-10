import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";

export class NoteListItem extends React.Component {
    render() {
        const className = this.props.note.selected
            ? "item item--selected"
            : "item";

        return (
            <div
                className={className}
                onClick={() => {
                    this.props.session.set(
                        "selectedNoteId",
                        this.props.note._id
                    );
                }}
            >
                <h5 className="item__title">
                    {this.props.note.title || "Untitled note"}
                </h5>
                <p className="item__subtitle">
                    {moment(this.props.note.updatedAt).format(
                        "DD/MM/YY - hh:MM"
                    )}
                </p>
            </div>
        );
    }
}

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return {
        session: Session
    };
})(NoteListItem);
