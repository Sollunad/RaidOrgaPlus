import { Action, CommitOptions, DispatchOptions, Mutation } from "vuex";
import { RootState } from "./RootState";

export interface RaidState {
	raid: any;
	termin: any;
}

export interface RaidGetters {
	termin: any;
	raid: any;
	raidRole: number;
}

export enum RaidMutations {
	SetRaid = "SetRaid",
	SetTermin = "SetTermin"
}

export enum RaidActions {
	OpenRaid = "OpenRaid",
	OpenTermin = "OpenTermin",
	OpenTerminFromHome = "OpenTerminFromHome"
}

export type RaidGettersDefinition = {
	[P in keyof RaidGetters]: (state: RaidState, getters: RaidGetters) => RaidGetters[P]
}

export type RaidMutationsDefinition = {
	[P in RaidMutations]: Mutation<RaidState>;
}

export type RaidActionsDefinition = {
	[P in RaidActions]: Action<RaidState, RootState>;
}

export interface BaseRaidMutationPayloadWithType {
	type: RaidMutations;
}

export interface RaidActionPayloadWithType {
	type: RaidActions;
}

export interface RaidCommit {
	(type: RaidMutations, payload?: unknown, options?: CommitOptions): void;
	<P extends BaseRaidMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

export interface RaidDispatch {
	(type: RaidActions, payload?: unknown, options?: DispatchOptions): Promise<unknown>;
	<P extends RaidActionPayloadWithType>(payloadWithType: P, options?: DispatchOptions): Promise<unknown>;
}