import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false
        };
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state;
        this.setState({ submitted: true })
        if(username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { username, password, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Login</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control username" name="username" onChange={this.handleChange} />
                        {submitted && !username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control password" name="password" onChange={this.handleChange}/>
                        {submitted && !password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit" disabled={this.props.loggingIn}>
                            Login
                        </button>
                        <Link to="/register" className="btn btn-link">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loggingIn: state.authentication ? state.authentication.loggingIn : false
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: bindActionCreators(userActions.login, dispatch)
    }
}

const LoginPage = connect(mapStateToProps, mapDispatchToProps)(Login);

export { LoginPage };
export { LoginPage as TestLoginPage };
