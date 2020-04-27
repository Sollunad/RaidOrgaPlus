export default {
    state: {
        user: {}
    },
    mutations: {
        setUser (state, user) {
            state.user = user;
        }
    },
    actions: {

    },
    getters: {
        user(state) {
            return state.user;
        }
    }
}