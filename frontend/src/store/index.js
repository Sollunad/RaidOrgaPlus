import Vuex from "vuex";
import user from './user';

export default function() {
    return new Vuex.Store({
        modules: {
            user,
        }
    })
}