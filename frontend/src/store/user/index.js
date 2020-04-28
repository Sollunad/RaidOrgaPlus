import _users from '../../services/endpoints/users';

export default {
    state: {
        loggedInUser: {},
        loginState: 0,
    },
    mutations: {
        setLoggedInUser(state, user) {
            state.loggedInUser = user;
        },
        setLoginState(state, id) {
            state.loginState = id;
        },
    },
    actions: {
        async getLoggedInUser(context) {
            const user = await _users.get();
            if (!Array.isArray(user) || user.length > 0) {
                this.user = user;
                context.commit('setLoggedInUser', user);
                context.commit('setLoginState', 1);
            } else {
                context.commit('setLoginState', -1);
            }
        },
    },
    getters: {
        loggedInUser(state) {
            return state.loggedInUser;
        },
        loginSuccess(state) {
            return state.loginState === 1;
        },
        loginFailed(state) {
            return state.loginState === -1;
        },
    },
}