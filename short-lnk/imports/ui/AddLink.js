import React from "react";
import Modal from "react-modal";

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
            url: "",
            error: ""
        };
    }

    onSubmit(event) {
        const { url } = this.state;
        event.preventDefault();

        Meteor.call("linksInsert", url, (err, res) => {
            if (!err) {
                this.setState({ modalIsOpen: false, url: "", error: "" });
            } else {
                this.setState({ error: err.reason });
            }
        });
    }

    onChange(event) {
        this.setState({ url: event.target.value.trim() });
    }

    modalToggle() {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen,
            url: "",
            error: ""
        });
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.modalToggle.bind(this)}
                    className="button"
                >
                    + Add Link
                </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.modalToggle.bind(this)}
                    ariaHideApp={false}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form
                        onSubmit={this.onSubmit.bind(this)}
                        className="boxed-view__form"
                    >
                        <input
                            ref="url"
                            type="text"
                            placeholder="New URL"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />

                        <button className="button">Add Link</button>
                        <button
                            type="button"
                            className="button button--greyed"
                            onClick={this.modalToggle.bind(this)}
                        >
                            Cancel
                        </button>
                    </form>
                </Modal>
            </div>
        );
    }
}
