<template>
  <v-app class="unselectable" v-resize="onResize">
    <MenuComp :show="showContent && !withoutLoginAllowed" />
    <v-content>
        <MainPage v-if="showContent" />
        <LoginRegisterPage v-else-if="showLogin" />
        <div class="spinner" v-else>
            <v-progress-circular indeterminate color="primary" />
        </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
	import Vue from 'vue';
	import MenuComp from './components/menu/MenuComp.vue';
	import MainPage from "./pages/MainPage.vue";
	import LoginRegisterPage from "./pages/LoginRegisterPage.vue";
	import { RootActions } from './models/Store/RootState';
	import { UserActions } from './models/Store/UserState';
	import { setTheme } from './utils/themes';

	export default Vue.extend({
		components: {
			LoginRegisterPage,
			MainPage,
			MenuComp,
		},
		props: {
			source: String
		},
		data: () => ({
			withoutLoginAllowed: false,
			allowedRoutes: ['preview', 'reset'],
		}),
		computed: {
			showContent: function(): boolean {
				return this.withoutLoginAllowed || this.$vStore.getters.loginSuccess;
			},
			showLogin: function(): boolean {
				return this.$vStore.getters.loginFailed;
			}
		},
		methods: {
			onResize: function(): void {
				this.$vStore.dispatch(RootActions.SaveWindowWidth, window.innerWidth);
			},
			guardRoute: function(): void {
				this.withoutLoginAllowed = this.allowedRoutes.includes(this.$router.currentRoute.path.split('/')[1]);
			}
		},
		created: async function(): Promise<void> {
			this.guardRoute();
			await this.$vStore.dispatch(UserActions.CheckBuild);
			await this.$vStore.dispatch(UserActions.GetLoggedInUser);

			if (this.$vStore.getters.loginSuccess) {
				let theme = this.$vStore.getters.selectedTheme;
				setTheme(theme, this.$vuetify);
			}

			if ('serviceWorker' in navigator) {
				await navigator.serviceWorker.register('service-worker.js');
			}
		},
		mounted: function(): void {
			this.onResize();
		},
		watch: {
			$route: function(): void {
				this.guardRoute();
			}
		}
	})
</script>

<style scoped lang="scss">
    .unselectable {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
    }

    .spinner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>