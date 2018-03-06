import React from "react";
import { Accounts } from "meteor/accounts-base";

import LinksList from "./LinksList";
import LinksHeader from "./LinksHeader";
import AddLink from "./AddLink";

const Links = () => {
    return (
        <div>
            <LinksHeader title="Your Links" />
            <LinksList />
            <AddLink />
        </div>
    );
}

export default Links;
