import React from "react";
import PropTypes from "prop-types";

export const NoteListEmptyItem = () => {
    return (
        <div>
            <div>
                <h5>You have no notes.</h5>
                <p>Create a note to get started!</p>
            </div>
        </div>
    );
};

export default NoteListEmptyItem;
