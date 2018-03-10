import React from "react";
import PropTypes from "prop-types";

export const NoteListEmptyItem = () => {
    return (
        <div>
            <p className="empty-item">You have no notes currently.</p>
        </div>
    );
};

export default NoteListEmptyItem;
