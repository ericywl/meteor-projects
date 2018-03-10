import React from "react";
import PropTypes from "prop-types";

export class NoteListEmptyItem extends React.Component {
    render() {
        return (
            <div>
                <p className="empty-item">You have no notes currently.</p>
            </div>
        );
    }
}

export default NoteListEmptyItem;
