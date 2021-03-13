import Vue, { PluginObject } from 'vue';
import Vuex, { ActionContext, Store } from "vuex";

import user from './user';
import raid from './raid';
import aufstellung from './aufstellung'

import { RootActions, RootActionsDefinition, RootGettersDefinition, RootMutations, RootMutationsDefinition, RootState } from '@/models/Store/RootState';
import { MyStore } from '@/models/Store/State';

declare module "vue/types/vue" {
	interface Vue {
		$vStore: MyStore;
	}
}

const typedStorePlugin: PluginObject<void> = {
	install(VueInstance: typeof Vue) {
		Object.defineProperty(VueInstance.prototype, '$vStore', {
			get() {
				return this.$store;
			}
		});
	}
};

Vue.use(Vuex);
Vue.use(typedStorePlugin);

const getters: RootGettersDefinition = {
	windowWidth: state => state.windowWidth
};

const mutations: RootMutationsDefinition = {
	[RootMutations.SaveWindowWidth]: (state: RootState, payload: number) => state.windowWidth = payload
};

const actions: RootActionsDefinition = {
	[RootActions.SaveWindowWidth]: (context: ActionContext<RootState, RootState>, payload: number) => context.commit(RootActions.SaveWindowWidth, payload)
};

const store = new Store<RootState>({
	state: {
		windowWidth: 0,
	},
	mutations: mutations,
	actions: actions,
	getters: getters,
	modules: {
		user,
		raid,
		aufstellung,
	}
});

export default store;