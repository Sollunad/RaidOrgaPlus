import { Action, CommitOptions, DispatchOptions, Mutation } from "vuex";

export interface RootState {
	windowWidth: number;
}

export interface RootGetters {
	windowWidth: number;
}

export type RootGettersDefinition = {
	[P in keyof RootGetters]: (state: RootState, getters: RootGetters) => RootGetters[P]
}

export enum RootMutations {
	SaveWindowWidth = "SAVE_WindowWidth"
}

export enum RootActions {
	SaveWindowWidth = "SAVE_WindowWidth"
}

export type RootMutationsDefinition = {
	[P in RootMutations]: Mutation<RootState>;
}

export type RootActionsDefinition = {
	[P in RootActions]: Action<RootState, RootState>;
}

export interface RootActionPayloadWithType {
	type: RootActions;
}

export interface BaseRootMutationPayloadWithType {
	type: RootMutations;
}

export interface RootCommit {
	(type: RootMutations, payload?: unknown, options?: CommitOptions): void;
	<P extends BaseRootMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

export interface RootDispatch {
	(type: RootActions, payload?: unknown, options?: DispatchOptions): Promise<unknown>;
	<P extends RootActionPayloadWithType>(payloadWithType: P, options?: DispatchOptions): Promise<unknown>;
}