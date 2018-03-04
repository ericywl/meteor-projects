import React from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        };
    }

    onSubmit(event) {
        event.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value;

        Meteor.loginWithPassword(email, password, (err) => {
            console.log("Login callback", err);
        });
    }

    render() {
        return (
            <div>
                <h1>Login to Short Lnk</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email"
                           placeholder="Email"/>
                    <input type="password" ref="password" name="password"
                           placeholder="Password"/>
                    <button>Login</button>
                </form>

                <p><Link to="/signup">Don't have an account?</Link></p>
            </div>
        );
    }
}