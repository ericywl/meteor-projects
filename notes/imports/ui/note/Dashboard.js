import React from "react";

import PrivateHeader from "../auth/PrivateHeader";
import NoteList from "./NoteList";
import Editor from "./Editor";

export const Links = () => {
    return (
        <div>
            <PrivateHeader title="Notes" />
            <div className="page-content">
                <div className="page-content__sidebar">
                    <NoteList />
                </div>
                <div className="page-content__main">
                    <Editor />
                </div>
            </div>
        </div>
    );
};

export default Links;
