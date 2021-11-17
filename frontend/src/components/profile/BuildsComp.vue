<template>
	<div>
		<div class="headline">
			Meine Builds
		</div>
		<p></p>
		<v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
		<BuildChipComp
			v-for="(build, idx) in builds"
			:close="ownProfile"
			:key="idx"
			:build="build"
			:star="true"
			:ownProfile="ownProfile"
			:edit="false"
			v-on:close="close(build, idx)"
			v-on:togglePrefer="togglePrefer(build, $event)"
		/>
		<v-dialog width="unset" v-model="addBuildDialog" v-if="!loading && ownProfile">
			<template v-slot:activator="{ on }">
				<v-chip v-on="on" class="addChip">
					<v-icon>add</v-icon>
				</v-chip>
			</template>
			<AddBuildComp v-on:add="add" />
		</v-dialog>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import AddBuildComp from "./AddBuildComp.vue";
	import BuildChipComp from "./BuildChipComp.vue";
	import _users from "../../services/endpoints/users";
	import { Build } from "models/Build";

	export default Vue.extend({
		name: "BuildsComp",
		components: { BuildChipComp, AddBuildComp },
		props: ["user", "ownProfile"],
		data: () => ({
			addBuildDialog: false,
			builds: [] as Build[],
			loading: true,
		}),
		methods: {
			add: async function(build: Build): Promise<void> {
				this.addBuildDialog = false;

				if (build == null) {
					return;
				}

				if (!this.buildExists(build)) {
					build.prefer = 0;
					this.builds.push(build);
					this.builds.sort(this.compareBuilds);
					let roles = build.role.map(r => r.id).join(', ');
					await _users.addBuild(build.class.id, roles);
				}
			},
			close: async function(build: Build, index: number): Promise<void> {
				let roles = build.role.map(r => r.id).join(', ');
				await _users.deleteBuild(build.class.id, roles);
				this.builds.splice(index, 1);
			},
			togglePrefer: async function(build: Build, stars: number): Promise<void> {
				build.prefer = stars;
				this.builds.sort(this.compareBuilds);
				let roles = build.role.map(r => r.id).join(', ');
				await _users.putPrefer(build.class.id, roles, build.prefer);
			},
			compareBuilds: function(buildA: Build, buildB: Build): number {
				if (buildA.prefer === buildB.prefer) {
					if (this.baseId(buildA) === this.baseId(buildB)) {
						if (buildA.class.id === buildB.class.id) {
							// if (buildA.role.id === buildB.role.id) {
							// 	return 0;
							// } else {
							// 	return buildA.role.id < buildB.role.id ? -1 : 1;
							// }
							return 0;
						} else {
							return buildA.class.id < buildB.class.id ? -1 : 1;
						}
					} else {
						return this.baseId(buildA) < this.baseId(buildB) ? -1 : 1;
					}
				} else {
					return buildA.prefer > buildB.prefer ? -1 : 1;
				}
			},
			baseId: function(build: Build): number {
				return ((build.class.id - 1) % 9) + 1;
			},
			buildExists: function(build: Build): boolean {
				let exists = false;

				let search = this.builds.filter(b => b.class.id === build.class.id);
				if (search != null && search.length > 0) {
					search.some(s => {
						if (s.role.length === build.role.length) {
							let searchRoleIds = s.role.map(r => r.id);
							let roleIds = build.role.map(r => r.id);
							exists = roleIds.every(r => searchRoleIds.includes(r));
							if (exists) {
								return exists;
							}
						}
					});
				}

				return exists;
			},
		},
		created: async function(): Promise<void> {
			this.builds = await _users.getBuilds(this.user.id);
			this.loading = false;
		},
	});
</script>

<style scoped>
	.addChip {
		margin: 5px;
	}
</style>
