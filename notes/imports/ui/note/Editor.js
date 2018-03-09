import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import { NotesDB } from "../../api/notes";

export class Editor extends React.Component {
    handleTitleChange(event) {
        this.props.call("notesUpdate", this.props.note._id, {
            title: event.target.value
        });
    }

    handleBodyChange(event) {
        this.props.call("notesUpdate", this.props.note._id, {
            body: event.target.value
        });
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input
                        type="text"
                        value={this.props.note.title}
                        placeholder="Untitled note"
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        cols="30"
                        rows="10"
                        value={this.props.note.body}
                        placeholder="Insert your note here..."
                        onChange={this.handleBodyChange.bind(this)}
                    />
                    <button>Delete note</button>
                </div>
            );
        }

        return (
            <p>
                {this.props.selectedNoteId
                    ? "Note not found."
                    : "Pick or create a note."}
            </p>
        );
    }
}

Editor.propTypes = {
    note: PropTypes.object,
    selectedNoteId: PropTypes.string
};

export default withTracker(() => {
    const selectedNoteId = Session.get("selectedNoteId");

    return {
        selectedNoteId,
        note: NotesDB.findOne({ _id: selectedNoteId }),
        session: Session,
        call: Meteor.call
    };
})(Editor);
