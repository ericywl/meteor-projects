import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

import { NotesDB } from "../../api/notes";
import history from "../../api/history";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            body: ""
        };
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

        if (currentNoteId && currentNoteId !== prevNoteId) {
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }

    handleTitleChange(event) {
        const title = event.target.value;
        this.setState({ title });
        this.props.call("notesUpdate", this.props.note._id, { title });
    }

    handleBodyChange(event) {
        const body = event.target.value;
        this.setState({ body });
        this.props.call("notesUpdate", this.props.note._id, { body });
    }

    handleRemove(event) {
        this.props.call("notesRemove", this.props.note._id);
        this.props.history.replace("/dashboard");
    }

    render() {
        if (this.props.note) {
            return (
                <div>
                    <input
                        type="text"
                        value={this.state.title}
                        placeholder="Untitled note"
                        onChange={this.handleTitleChange.bind(this)}
                    />
                    <textarea
                        cols="30"
                        rows="10"
                        value={this.state.body}
                        placeholder="Insert your note here..."
                        onChange={this.handleBodyChange.bind(this)}
                    />
                    <button onClick={this.handleRemove.bind(this)}>
                        Delete note
                    </button>
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
    selectedNoteId: PropTypes.string,
    call: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
};

export default withTracker(() => {
    const selectedNoteId = Session.get("selectedNoteId");

    return {
        selectedNoteId,
        history,
        note: NotesDB.findOne({ _id: selectedNoteId }),
        session: Session,
        call: Meteor.call
    };
})(Editor);
