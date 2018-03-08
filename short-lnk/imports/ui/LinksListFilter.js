import React from "react";
import { Session } from "meteor/session";

export default class LinksListFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showVisible: false
        };
    }

    componentDidMount() {
        this.checkboxTracker = Tracker.autorun(() => {
            const showVis = Session.get("showVisible");
            this.setState({ showVisible: showVis });
        });
    }

    componentWillUnmount() {
        this.checkboxTracker.stop();
    }

    render() {
        return (
            <div>
                <label className="checkbox">
                    <input className="checkbox__box"
                        type="checkbox"
                        checked={!this.state.showVisible}
                        onChange={e => {
                            Session.set("showVisible", !e.target.checked);
                        }}
                    />
                    show hidden links
                </label>
            </div>
        );
    }
}
