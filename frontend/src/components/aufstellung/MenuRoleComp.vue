<template>
	<div>
		<v-container grid-list-sm class="menu">
			<v-row dense>
				<v-col v-for="(role, index) in roles" :key="index" cols="4">
					<v-tooltip bottom>
						<template v-slot:activator="{ on }">
							<v-avatar :size="30" class="icon" slot="activator" @click="pick(role)" :tile="true" v-on="on">
								<img :src="roleIcon(role.abbr)" />
							</v-avatar>
						</template>
						<span>{{ role.name }}</span>
					</v-tooltip>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script lang="ts">
	import { ROLES } from "../../../../models/Rolle";
	import Vue from "vue";
	import _icons from "../../services/icons";

	export default Vue.extend({
		name: "MenuRoleComp",
		props: ["showStar"],
		methods: {
			roleIcon: function(name: string): string {
				return _icons.roleIcon(name);
			},
			pick: function(role: any) {
				this.$emit("pick", role);
			},
		},
		computed: {
			roles: function() {
				if (!this.showStar) {
					return ROLES.filter(r => r.id != 7);
				}
				return ROLES;
			},
		},
	});
</script>

<style scoped lang="scss">
	.menu {
		background-color: $tabHeader;
	}

	.icon {
		margin-right: -1rem;
	}
</style>
