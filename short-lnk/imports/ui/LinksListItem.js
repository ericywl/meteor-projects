import React from "react";
import PropTypes from "prop-types";
import Clipboard from "clipboard";

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

    render() {
        return (
            <ul>
                <li>{this.props.url}</li>
                <li>{this.props.shortUrl}</li>
                <button ref="copy" data-clipboard-text={this.props.shortUrl}>
                    {this.state.justCopied ? "Copied" : "Copy"}
                </button>
            </ul>
        );
    }
}

LinksListItem.propTypes = {
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    shortUrl: PropTypes.string.isRequired
};
