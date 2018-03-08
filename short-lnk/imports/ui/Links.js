import React from "react";
import { Accounts } from "meteor/accounts-base";

import LinksHeader from "./LinksHeader";
import LinkListFilter from "./LinksListFilter";
import LinksList from "./LinksList";
import AddLink from "./AddLink";

const Links = () => {
    return (
        <div>
            <LinksHeader title="Short Lnk" />
            <div className="page-content">
                <LinkListFilter />
                <AddLink />
                <LinksList />
            </div>
        </div>
    );
};

export default Links;
