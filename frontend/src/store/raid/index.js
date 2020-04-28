import router from '../../router';

export default {
    state: {
        raid: {},
        termin: {},
    },
    mutations: {
        setRaid(state, raid) {
            state.raid = raid;
        },
        setTermin(state, termin) {
            state.termin = termin;
        },
    },
    actions: {
        openRaid: function(context, raid) {
            context.commit('setRaid', raid);
            router.push('raid');
        },
        openTermin: function(context, termin) {
            context.commit('setTermin', termin);
            router.push('aufstellung');
        },
        openTerminFromHome: function(context, clicked) {
            context.commit('setRaid', clicked.raid);
            context.commit('setTermin', clicked.termin);
            router.push('raid/aufstellung');
        }
    },
    getters: {
        termin(state) {
            return state.termin;
        },
        raid(state) {
            return state.raid;
        }
    },
}