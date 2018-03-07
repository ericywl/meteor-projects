import React from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";
import moment from "moment";

export default class LinksListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            justCopied: false
        };
    }

    componentDidMount() {
        this.clipboard = new Clipboard(this.refs.copy);

        this.clipboard.on("success", e => {
            this.setState({ justCopied: true });
            setTimeout(() => this.setState({ justCopied: false }), 1000);

            console.log(`${e.text} copied!`);
        });

        this.clipboard.on("error", () => {
            console.log(
                "Auto-copying did not work! Please copy the link manually."
            );
        });
    }

    componentWillUnmount() {
        this.clipboard.destroy();
    }

    renderStats() {
        const visitMsg = this.props.visitedCount == 1 ? "visit" : "visits";
        let visitedMsg = null;
        if (typeof this.props.lastVisitedAt === "number") {
            const lastVisit = moment(this.props.lastVisitedAt).fromNow();
            visitedMsg = `(visited ${lastVisit})`;
        }

        return (
            <li>
                {this.props.visitedCount} {visitMsg} {visitedMsg}
            </li>
        );
    }

    render() {
        return (
            <ul>
                <li>{this.props.url}</li>
                <li>{this.props.shortUrl}</li>
                <li>{this.props.visible ? "Visible" : "Hidden"}</li>
                <li>{this.props.visitedCount}</li>
                {this.renderStats()}
                <a href={this.props.shortUrl} target="_blank">Visit</a>

                <button ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? "Copied" : "Copy"}
                </button>

                <button
                    onClick={() => {
                        Meteor.call(
                            "linksSetVisibility",
                            this.props._id,
                            !this.props.visible
                        );
                    }}
                >
                    {this.props.visible ? "Hide" : "Unhide"}
                </button>
            </ul>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    visitedCount: PropTypes.number.isRequired,
    lastVisitedAt: PropTypes.number
};
