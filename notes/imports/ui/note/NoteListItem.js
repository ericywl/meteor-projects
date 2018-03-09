import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Session } from "meteor/session";
import { withTracker } from "meteor/react-meteor-data";

export const NoteListItem = props => {
    return (
        <div
            onClick={() => {
                props.session.set("selectedNoteId", props.note._id);
            }}
        >
            <h5>{props.note.title || "Untitled note"}</h5>
            {props.note.selected ? "Selected" : undefined}
            <p>{moment(props.note.updatedAt).format("DD/MM/YYYY")}</p>
        </div>
    );
};

NoteListItem.propTypes = {
    note: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return {
        session: Session
    };
})(NoteListItem);
