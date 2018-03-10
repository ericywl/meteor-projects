import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

export const NoteListHeader = props => {
    return (
        <div>
            <button
                onClick={() => {
                    props.meteorCall("notesInsert", (err, res) => {
                        if (res) {
                            props.session.set("selectedNoteId", res);
                        }
                    });
                }}
            >
                + Create Note
            </button>
        </div>
    );
};

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    session: PropTypes.object.isRequired
};

export default withTracker(() => {
    return {
        meteorCall: Meteor.call,
        session: Session
    };
})(NoteListHeader);
