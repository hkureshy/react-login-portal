import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class Home extends Component {

    render() {
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2 align="center">Welcome! You have successfully logged in.</h2>
                <p align="center">
                    <Link to="/login" className="btn btn-link btn-lg" onClick={this.props.logout} >Logout</Link>
                </p>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(userActions.logout())
    }
}

const HomePage = connect(null, mapDispatchToProps)(Home);
export { HomePage };
