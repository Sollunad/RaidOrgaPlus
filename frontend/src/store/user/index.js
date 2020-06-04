import _users from '../../services/endpoints/users';
import _build from '../../services/endpoints/build';

export default {
    state: {
        loggedInUser: {},
        loginState: 0,
        buildCheck: null,
        frontendBuild: '2020_05_18',
    },
    mutations: {
        setLoggedInUser(state, user) {
            state.loggedInUser = user;
        },
        setLoginState(state, id) {
            state.loginState = id;
        },
        setUserName(state, name) {
            state.loggedInUser.name = name;
        },
        setBuildCheck(state, success) {
            state.buildCheck = success;
        },
    },
    actions: {
        async checkBuild(context) {
            const successState = await _build.checkBuild(context.getters.frontendBuild);
            context.commit('setBuildCheck', successState);
        },
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
        async changeUserName(context, name) {
            await _users.changeName(name);
            context.commit('setUserName', name);
        }
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
        frontendBuild(state) {
            return state.frontendBuild;
        },
        backendBuild(state) {
            return state.buildCheck === 'Success'? state.frontendBuild : state.buildCheck;
        },
        buildCheck(state) {
            return state.buildCheck === 'Success';
        }
    },
}