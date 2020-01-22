import { userConstants } from '../constants';
import { userService } from '../services';
import { alertActions } from './';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password) {
    // return the promise using fetch which adds to localstorage on resolve
    return (dispatch) => {
        dispatch(request(username));
        dispatch(alertActions.clear());
        return new Promise((resolve, reject) => {
            userService.login(username, password)
                .then(() => {
                    localStorage.setItem("user", JSON.stringify({username}));
                    resolve(dispatch(success(username)));
                })
                .catch(err => {
                    dispatch(alertActions.error(err));
                    reject(dispatch(failure(err)));
                })
        })

        function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
        function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
        function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
    }
}

function logout() {
    return (dispatch) => {
        userService.logout();
        dispatch({ type: userConstants.LOGOUT });
    }
}

function register(user) {
    return (dispatch) => {
        dispatch(request(user));
        dispatch(alertActions.clear());
        return new Promise((resolve, reject) => {
            userService.register(user)
                .then(() => {
                    dispatch(alertActions.success("Registration successful"));
                    resolve(dispatch(success(user)));
                })
                .catch(err => {
                    dispatch(alertActions.error(err));
                    reject(dispatch(failure(err)));
                })
        })
    
    
        function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
        function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
        function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
    }
}
