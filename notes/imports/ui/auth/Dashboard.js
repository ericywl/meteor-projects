import React from "react";

import PrivateHeader from "./PrivateHeader";
import NoteList from "../note/NoteList";

const Links = () => {
    return (
        <div>
            <PrivateHeader title="Dashboard" />
            <div className="page-content">
                <NoteList />
            </div>
        </div>
    );
};

export default Links;
