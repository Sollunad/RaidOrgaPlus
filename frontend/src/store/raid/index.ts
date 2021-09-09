import { RaidActions, RaidActionsDefinition, RaidGettersDefinition, RaidMutations, RaidMutationsDefinition, RaidState } from '@/models/Store/RaidState';
import { RootState } from '@/models/Store/RootState';
import { ActionContext, Module } from 'vuex';
import { Termin } from 'models/Termin';
import { userRaid } from 'models/Types';
import router from '../../router';

const mutations: RaidMutationsDefinition = {
	[RaidMutations.SetRaid]: (state: RaidState, raid: any) => {
		state.raid = raid;
	},
	[RaidMutations.SetTermin]: (state: RaidState, termin: any) => {
		state.termin = termin;
	}
}

const actions: RaidActionsDefinition = {
	[RaidActions.OpenRaid]: (context: ActionContext<RaidState, RootState>, raid: userRaid) => {
		context.commit(RaidMutations.SetRaid, raid);
		router.push('raid');
	},
	[RaidActions.OpenTermin]: (context: ActionContext<RaidState, RootState>, termin: any) => {
		context.commit(RaidMutations.SetTermin, termin);
		router.push('aufstellung');
	},
	[RaidActions.OpenTerminFromHome]: (context: ActionContext<RaidState, RootState>, clicked: { termin: Termin, raid: userRaid }) => {
		context.commit(RaidMutations.SetRaid, clicked.raid);
		context.commit(RaidMutations.SetTermin, clicked.termin);
		router.push('raid/aufstellung');
	}
};

const getters: RaidGettersDefinition = {
	raid: state => state.raid,
	termin: state => state.termin,
	raidRole: state => {
		if (state.raid) {
			return state.raid.role;
		}
		return 0;
	}
};

const RaidModule: Module<RaidState, RootState> = {
    state: {
        raid: null as unknown as userRaid,
        termin: null as unknown as Termin,
    },
    mutations: mutations,
    actions: actions,
    getters: getters,
}

export default RaidModule;