import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { withTracker } from "meteor/react-meteor-data";

import { NotesDB } from "../../api/notes";
import history from "../../api/history";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            title: "",
            body: ""
        };
    }

    componentWillMount() {
        Modal.setAppElement("body");
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

        if (!this.state.title) {
            this.refs.editorTitle.focus();
        } else {
            this.refs.editorBody.focus();
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

    modalToggle() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    handleRemove(event) {
        this.props.call("notesRemove", this.props.note._id);
        this.props.history.replace("/dashboard");
        this.modalToggle();
    }

    renderModal() {
        const modalStyles = { overlay: { zIndex: 10 } };

        return (
            <Modal
                style={modalStyles}
                isOpen={this.state.modalIsOpen}
                contentLabel="Add Link"
                onRequestClose={this.modalToggle.bind(this)}
                className="boxed-view__box"
                overlayClassName="boxed-view boxed-view--modal"
            >
                <p>
                    Are you sure you want to remove{" "}
                    {this.state.title
                        ? `'${this.state.title}'`
                        : "'Untitled note'"}?
                </p>
                <div className="button__side-by-side">
                    <button
                        className="button button--delete 
                            button--confirm-delete"
                        onClick={this.handleRemove.bind(this)}
                    >
                        Yes
                    </button>
                    <button
                        className="button button--greyed"
                        onClick={this.modalToggle.bind(this)}
                    >
                        No
                    </button>
                </div>
            </Modal>
        );
    }

    render() {
        if (!this.props.note) {
            return (
                <div className="editor">
                    <p className="editor__message">
                        {this.props.selectedNoteId
                            ? "Note not found!"
                            : "Pick or create a note to get started."}
                    </p>
                </div>
            );
        }

        return (
            <div className="editor">
                <input
                    ref="editorTitle"
                    className="editor__title"
                    value={this.state.title}
                    placeholder="Untitled note"
                    onChange={this.handleTitleChange.bind(this)}
                />

                <textarea
                    ref="editorBody"
                    className="editor__body"
                    value={this.state.body}
                    placeholder="Insert your note here..."
                    onChange={this.handleBodyChange.bind(this)}
                />

                <div>
                    <button
                        className="button button--greyed button--delete"
                        onClick={this.modalToggle.bind(this)}
                    >
                        Delete note
                    </button>
                    {this.renderModal()}
                </div>
            </div>
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
