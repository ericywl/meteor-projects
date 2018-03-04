import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

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
        Accounts.createUser({email, password}, (err) => {
            console.log("Sign up callback", err);
        });
    }

    render() {
        return (
            <div>
                <h1>Sign up for Short Lnk</h1>

                {this.state.error ? <p>{this.state.error}</p> : undefined}

                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="email" ref="email" name="email"
                           placeholder="Email"/>
                    <input type="password" ref="password" name="password"
                           placeholder="Password"/>
                    <button>Create Account</button>
                </form>

                <p><Link to="/">Already have an account?</Link></p>
            </div>
        );
    }
}