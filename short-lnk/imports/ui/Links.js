import React from "react";
import { Accounts } from "meteor/accounts-base";

import LinksList from "./LinksList";
import LinksHeader from "./LinksHeader";
import AddLink from "./AddLink";

export default class Link extends React.Component {
    render() {
        return (
            <div>
                <LinksHeader title="Your Links" />
                <LinksList />
                <AddLink />
            </div>
        );
    }
}
