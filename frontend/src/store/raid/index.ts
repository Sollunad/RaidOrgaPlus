import router from '../../router';

export interface Raid {
	raid: any;
	termin: any;
}

export default {
    state: {
        raid: null,
        termin: null,
    } as Raid,
    mutations: {
        setRaid(state: Raid, raid: any) {
            state.raid = raid;
        },
        setTermin(state: Raid, termin: any) {
            state.termin = termin;
        },
    },
    actions: {
        openRaid: function(context: any, raid: any) {
            context.commit('setRaid', raid);
            router.push('raid');
        },
        openTermin: function(context: any, termin: any) {
            context.commit('setTermin', termin);
            router.push('aufstellung');
        },
        openTerminFromHome: function(context: any, clicked: any) {
            context.commit('setRaid', clicked.raid);
            context.commit('setTermin', clicked.termin);
            router.push('raid/aufstellung');
        },
    },
    getters: {
        termin(state: Raid): any {
            return state.termin;
        },
        raid(state: Raid): any {
            return state.raid;
        },
        raidRole(state: Raid): number {
            if (state.raid) {
                return state.raid.role;
            }
            return 0;
        }
    },
}