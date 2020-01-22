import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PrivateRoute } from './PrivateRoute.js';
import { HomePage } from './components/HomePage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';

class AppComponent extends React.Component {
    componentDidUpdate(oldProps) {
        const { registered, loggedIn, history } = this.props;
        if(registered && oldProps.registered !== registered) {
            history.push("/login");
        }
        if(loggedIn && oldProps.loggedIn !== loggedIn) {
            history.push("/");
        }
    }

    render() {
        const { alert } = this.props;
        return (
            <div className="container">
                { alert.message &&
                    <div className={`alert ${alert.type}`} role="alert">
                        {alert.message}
                    </div>
                }
                <div className="col-sm-8 col-sm-offset-2">
                    <Switch>
                        <Route exact path='/login' component={LoginPage} />
                        <Route exact path='/register' component={RegisterPage} />
                        <PrivateRoute {...this.props} path='/' component={HomePage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert,
        loggedIn: state.authentication.loggedIn,
        registered: state.registration.registered
    };
}

const App = withRouter(connect(mapStateToProps, null)(AppComponent));
export { App };