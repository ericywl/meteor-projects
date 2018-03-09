import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import { NotesDB } from "../../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export const NoteList = props => {
    const renderList = () => {
        if (props.notes.length === 0) {
            return <NoteListEmptyItem />;
        }

        return props.notes.map(note => {
            return <NoteListItem key={note._id} note={note} />;
        });
    };

    return (
        <div>
            <NoteListHeader />
            {renderList()}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    Meteor.subscribe("notes");

    return {
        notes: NotesDB.find().fetch()
    };
})(NoteList);
