<template>
	<v-card>
		<v-card-title>
			<span>Build Hinzufügen</span>
			<v-spacer />
			<v-tooltip top>
				<template v-slot:activator="{ on, attrs }">
					<v-icon v-on="on" v-bind="attrs">
						mdi-help-circle
					</v-icon>
				</template>
				<span>Hier könnte eine nützliche hilfe stehen. Oder auch einfach nur mist.</span>
			</v-tooltip>
		</v-card-title>

		<v-divider style="margin-top: -4px" />

		<v-card-text class="mainBlock">
			<v-container style="background-color: unset">
				<v-row no-gutters>
					<v-col cols="6">
						<MenuClassComp v-on:pick="pickClass"></MenuClassComp>
					</v-col>
					<v-col cols="6">
						<MenuRoleComp v-on:pick="pickRole"></MenuRoleComp>
					</v-col>
				</v-row>
			</v-container>
			<div class="chip">
				<BuildChipComp :build="build" :edit="true" @roleChange="roleChange" @selected="selectedChange"></BuildChipComp>
			</div>
		</v-card-text>

		<v-divider />

		<v-card-actions>
			<v-spacer />
			<v-btn @click="closeDialog">
				Abbr.
			</v-btn>
			<v-btn @click="addBuild">
				Hinzufügen
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
	import { Build } from "models/Build";
	import { Role } from "models/Rolle";
	import Vue from "vue";
	import MenuClassComp from "../aufstellung/MenuClassComp.vue";
	import MenuRoleComp from "../aufstellung/MenuRoleComp.vue";
	import BuildChipComp from "./BuildChipComp.vue";

	export default Vue.extend({
		name: "AddBuildComp",
		data: () => ({
			build: {
				class: null,
				role: [{ id: 0 }],
			} as Build,
			selected: null as number,
		}),
		components: { BuildChipComp, MenuRoleComp, MenuClassComp },
		methods: {
			pickClass: function(clss: any): void {
				this.build.class = clss;
			},
			pickRole: function(role: Role): void {
				if (this.selected != null) {
					this.build.role.splice(this.selected, 1, role);
				}
				else {
					let index = this.build.role.findIndex(r => r.id === 0);
					
					if (index === -1) {
						index = this.build.role.length - 1;
					}

					this.build.role.splice(index, 1, role);
				}
			},
			addBuild: function(): void {
				this.$emit("add", { class: this.build.class, role: this.build.role });
				this.build.class = null;
				this.build.role = null;
			},
			closeDialog: function(): void {
				this.$emit("add", null);
			},
			roleChange: function(change: string): void {
				if (change === "add") {
					this.build.role.push({ id: 0 } as Role);
				} else if (change === "remove") {
					this.build.role.pop();
				}
			},
			selectedChange: function(selected: number) {
				this.selected = selected;
			}
		},
	});
</script>

<style scoped>
	.container {
		background-color: var(--v-dialogBox-base);
		padding: 0 0 10px 0;
	}

	.mainBlock {
		background-color: var(--v-tabHeader-base);
	}

	.chip {
		margin-left: 10px;
		margin-right: 5px;
	}
</style>
