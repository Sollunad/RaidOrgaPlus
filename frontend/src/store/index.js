import Vuex from "vuex";
import user from './user';

export default function() {
    return new Vuex.Store({
        state: {
            windowWidth: 0,
        },
        mutations: {
            saveWindowWidth(state, width) {
                state.windowWidth = width;
            },
        },
        actions: {
            saveWindowWidth(context) {
                context.commit('saveWindowWidth', window.innerWidth);
            }
        },
        getters: {
            windowWidth(state) {
                return state.windowWidth;
            },
        },
        modules: {
            user,
        }
    })
}