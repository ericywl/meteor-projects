import React from "react";
import { withTracker } from "meteor/react-meteor-data";

export const Editor = () => {
    return <div>This is editor.</div>;
};

export default withTracker(() => {
    return {
        session: Session
    };
})(Editor);
