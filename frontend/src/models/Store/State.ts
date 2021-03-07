import { Store } from "vuex";
import { AufstellungActions, AufstellungCommit, AufstellungDispatch, AufstellungGetters, AufstellungState } from "./AufstellungState";
import { RaidActions, RaidCommit, RaidDispatch, RaidGetters, RaidState } from "./RaidState";
import { RootActions, RootCommit, RootDispatch, RootGetters, RootState } from "./RootState";
import { UserActions, UserCommit, UserDispatch, UserGetters, UserState } from "./UserState";

interface State extends RootState, UserState, RaidState, AufstellungState {}

interface Getters extends RootGetters, UserGetters, RaidGetters, AufstellungGetters {}

interface MyCommit extends RootCommit, UserCommit, RaidCommit, AufstellungCommit {}

interface MyDispatch extends RootDispatch, UserDispatch, RaidDispatch, AufstellungDispatch {}

export const MyActions = { ...RootActions, ...UserActions, ...RaidActions, ...AufstellungActions };

export interface MyStore extends Store<State> {
	getters: Getters;
	commit: MyCommit;
	dispatch: MyDispatch;
}