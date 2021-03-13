import { Action, CommitOptions, DispatchOptions, Mutation } from "vuex"
import { RootState } from "./RootState"

export interface UserState {
	loggedInUser: any;
	loginState: number;
	buildCheck: any;
	frontendBuild: string;
}

export interface UserGetters {
	loggedInUser: any;
	loginSuccess: boolean;
	loginFailed: boolean;
	frontendBuild: string;
	backendBuild: any;
	buildCheck: boolean;
}

export enum UserMutations {
	SetLoggedInUser = "SetLoggedInUser",
	SetLoginState = "SetLoginState",
	SetUserName = "SetUserName",
	SetBuildCheck = "SetBuildCheck",
}

export enum UserActions {
	CheckBuild = "CheckBuild",
	GetLoggedInUser = "GetLoggedInUser",
	ChangeUserName = "ChangeUserName",
}

export type UserGettersDefinition = {
	[P in keyof UserGetters]: (state: UserState, getters: UserGetters) => UserGetters[P]
}

export type UserMutationsDefinition = {
	[P in UserMutations]: Mutation<UserState>;
}

export type UserActionsDefinition = {
	[P in UserActions]: Action<UserState, RootState>;
}

export interface BaseUserMutationPayloadWithType {
	type: UserMutations;
}

export interface UserActionPayloadWithType {
	type: UserActions;
}

export interface UserCommit {
	(type: UserMutations, payload?: unknown, options?: CommitOptions): void;
	<P extends BaseUserMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

export interface UserDispatch {
	(type: UserActions, payload?: unknown, options?: DispatchOptions): Promise<unknown>;
	<P extends UserActionPayloadWithType>(payloadWithType: P, options?: DispatchOptions): Promise<unknown>;
}