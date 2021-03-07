import { ActionContext, Module } from "vuex";

import _users from '../../services/endpoints/users';
import _build from '../../services/endpoints/build';
import { UserActions, UserActionsDefinition, UserGettersDefinition, UserMutations, UserMutationsDefinition, UserState } from '@/models/Store/UserState';
import { RootState } from "@/models/Store/RootState";

const getters: UserGettersDefinition = {
	loggedInUser: state => {
		return state.loggedInUser
	},
	loginSuccess: state => state.loginState === 1,
	loginFailed: state => state.loginState === -1,
	frontendBuild: state => state.frontendBuild,
	backendBuild: state => state.buildCheck === 'Success' ? state.frontendBuild : state.buildCheck,
	buildCheck: state => state.buildCheck === 'Success'
};

const mutations: UserMutationsDefinition = {
	[UserMutations.SetLoggedInUser]: (state: UserState, user: any) => {
		state.loggedInUser = user;
	},
	[UserMutations.SetLoginState]: (state: UserState, id: number) => {
		state.loginState = id;
	},
	[UserMutations.SetUserName]: (state: UserState, name: any) => {
		state.loggedInUser.name = name;
	},
	[UserMutations.SetBuildCheck]: (state: UserState, success: any) => {
		state.buildCheck = success;
	},
};

const actions: UserActionsDefinition = {
	[UserActions.CheckBuild]: async (context: ActionContext<UserState, RootState>) => {
		const successState = await _build.checkBuild(context.getters.frontendBuild);
		context.commit(UserMutations.SetBuildCheck, successState);
	},
	[UserActions.ChangeUserName]: async (context: ActionContext<UserState, RootState>, payload: any) => {
		await _users.changeName(payload);
		context.commit(UserMutations.SetUserName, payload);
	},
	[UserActions.GetLoggedInUser]: async (context: ActionContext<UserState, RootState>) => {
		const user = await _users.get();
        if (!Array.isArray(user) || user.length > 0) {
            // this.user = user;
            context.commit(UserMutations.SetLoggedInUser, user);
            context.commit(UserMutations.SetLoginState, 1);
        } else {
            context.commit(UserMutations.SetLoginState, -1);
        }
	}
};

const UserModule: Module<UserState, RootState> = {
    state: {
        loggedInUser: {},
        loginState: 0,
        buildCheck: null,
        frontendBuild: '2020_06_04',
    },
    mutations: mutations,
	actions: actions,
    getters: getters,
}

export default UserModule;