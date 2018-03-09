import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import { NotesDB } from "../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NotesListItem";

export const NoteList = props => {
    return (
        <div>
            <NoteListHeader />
            {props.notes.map(note => {
                return <NoteListItem key={note._id} note={note} />;
            })}
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
