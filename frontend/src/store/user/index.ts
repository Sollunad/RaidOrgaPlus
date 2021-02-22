import _users from '../../services/endpoints/users';
import _build from '../../services/endpoints/build';

export interface User {
	loggedInUser: any;
	loginState: number;
	buildCheck: any;
	frontendBuild: string;
}

export default {
    state: {
        loggedInUser: {},
        loginState: 0,
        buildCheck: null,
        frontendBuild: '2020_06_04',
    } as User,
    mutations: {
        setLoggedInUser(state: User, user: any) {
            state.loggedInUser = user;
        },
        setLoginState(state: User, id: any) {
            state.loginState = id;
        },
        setUserName(state: User, name: any) {
            state.loggedInUser.name = name;
        },
        setBuildCheck(state: User, success: any) {
            state.buildCheck = success;
        },
    },
    actions: {
        async checkBuild(context: any) {
            const successState = await _build.checkBuild(context.getters.frontendBuild);
            context.commit('setBuildCheck', successState);
        },
        async getLoggedInUser(context: any) {
            const user = await _users.get();
            if (!Array.isArray(user) || user.length > 0) {
                // this.user = user;
                context.commit('setLoggedInUser', user);
                context.commit('setLoginState', 1);
            } else {
                context.commit('setLoginState', -1);
            }
        },
        async changeUserName(context: any, name: any) {
            await _users.changeName(name);
            context.commit('setUserName', name);
        }
    },
    getters: {
        loggedInUser(state: User) {
            return state.loggedInUser;
        },
        loginSuccess(state: User) {
            return state.loginState === 1;
        },
        loginFailed(state: User) {
            return state.loginState === -1;
        },
        frontendBuild(state: User) {
            return state.frontendBuild;
        },
        backendBuild(state: User) {
            return state.buildCheck === 'Success'? state.frontendBuild : state.buildCheck;
        },
        buildCheck(state: User) {
            return state.buildCheck === 'Success';
        }
    },
}