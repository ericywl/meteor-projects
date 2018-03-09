import React from "react";
import { Accounts } from "meteor/accounts-base";

import PrivateHeader from "./PrivateHeader";
import NoteList from "./NoteList";

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
