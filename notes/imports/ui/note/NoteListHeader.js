import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

export class NoteListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
    }

    handleSearchChange(event) {
        const search = event.target.value
            .trim()
            .toLowerCase()
            .replace(/\s/g, "");
        this.setState({ search });
        this.props.session.set("searchQuery", search);
    }

    render() {
        return (
            <div className="item-list__header">
                <button
                    className="button"
                    onClick={() => {
                        this.props.meteorCall("notesInsert", (err, res) => {
                            if (res) {
                                this.props.session.set("selectedNoteId", res);
                            }
                        });
                    }}
                >
                    + Create Note
                </button>

                <input
                    type="search"
                    placeholder="Search for note title"
                    onChange={this.handleSearchChange.bind(this)}
                />
            </div>
        );
    }
}

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
