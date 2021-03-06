import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import FlipMove from "react-flip-move";

import { NotesDB } from "../../api/notes";
import NoteListHeader from "./NoteListHeader";
import NoteListItem from "./NoteListItem";
import NoteListEmptyItem from "./NoteListEmptyItem";

export class NoteList extends React.Component {
    renderList() {
        if (this.props.notes.length === 0) {
            return <NoteListEmptyItem />;
        }

        return this.props.notes.map(note => {
            return <NoteListItem key={note._id} note={note} />;
        });
    }

    render() {
        return (
            <div className="item-list">
                <NoteListHeader />
                <FlipMove maintainContainerHeight="true">
                    {this.renderList()}
                </FlipMove>
            </div>
        );
    }
}

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
};

export default withTracker(() => {
    const selectedNoteId = Session.get("selectedNoteId");
    const searchQuery = Session.get("searchQuery");
    Meteor.subscribe("notes", () => Session.set("dataLoaded", true));

    return {
        notes: NotesDB.find({}, { sort: { updatedAt: -1 } })
            .fetch()
            .map(note => {
                return {
                    ...note,
                    selected: note._id === selectedNoteId
                };
            })
            .filter(note => {
                const noteTitle = note.title ? note.title : "Untitled note";
                return (
                    noteTitle
                        .toLowerCase()
                        .replace(/\s/g, "")
                        .indexOf(searchQuery) !== -1
                );
            })
    };
})(NoteList);
