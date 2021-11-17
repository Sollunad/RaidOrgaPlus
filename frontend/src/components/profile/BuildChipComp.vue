<template>
	<span>
		<v-chip
			:close="close"
			:small="small"
			:disabled="disabled"
			:color="color"
			v-model="chip"
			@click:close="closeChip"
			light
			class="chip elevation-12"
		>
			<v-tooltip bottom v-if="build.class != null">
				<template v-slot:activator="{ on }">
					<v-avatar class="classIcon" tile v-on="on">
						<img :src="classIcon" v-if="classIcon" />
					</v-avatar>
				</template>
				<span>
					{{ build.class.name }}
				</span>
			</v-tooltip>
			<v-avatar class="classIcon" tile v-else>
				<img :src="classIcon" v-if="classIcon" />
			</v-avatar>
			
			<template v-for="(role, idx) in this.roles">
				<v-tooltip bottom :key="idx" v-if="role.id > 0">
					<template v-slot:activator="{ on }">
						<v-avatar
							tile
							:class="[{ highlighted: selected(idx) }, roleIcon]"
							@click="selectRole(idx)"
							v-on="on"
						>
							<img :src="roleIcon(role.abbr)" v-if="role.id > 0" />
						</v-avatar>
					</template>
					<span v-if="role.id > 0">
						{{ role.name }}
					</span>
				</v-tooltip>
				<v-avatar
					v-else
					tile
					:class="[{ highlighted: selected(idx) }, roleIcon]"
					:key="idx"
					@click="selectRole(idx)"
				>
					<img :src="roleIcon(role.abbr)" v-if="role.id > 0" />
				</v-avatar>
			</template>

			<v-menu offset-y v-if="star">
				<template v-slot:activator="{ on }">
					<span v-on="on">
						<v-avatar class="star" tile>
							<v-icon :color="prefered(build.prefer)" size="24">{{ icon(build.prefer) }}</v-icon>
						</v-avatar>
					</span>
				</template>
				<v-container grid-list-sm class="menu">
					<v-layout column wrap>
						<v-flex v-for="star in stars" :key="star" xs4 @click="togglePrefer(star)">
							<v-avatar class="star" tile>
								<v-icon :color="prefered(star)">{{ icon(star) }}</v-icon>
							</v-avatar>
						</v-flex>
					</v-layout>
				</v-container>
			</v-menu>
		</v-chip>
		<span v-if="edit">
			<v-btn fab color="green" width="24px" height="24px" v-if="this.roles.length < 4" @click="roleChange('add')">
				<v-icon>add</v-icon>
			</v-btn>
			<v-btn
				fab
				color="red"
				width="24px"
				height="24px"
				style="margin-left: 4px"
				v-if="this.roles.length > 1"
				@click="roleChange('remove')"
			>
				<v-icon>remove</v-icon>
			</v-btn>
		</span>
	</span>
</template>

<script lang="ts">
	import { Build } from "models/Build";
	import { Role } from "models/Rolle";
	import Vue, { PropType } from "vue";
	import _icons from "../../services/icons";

	export default Vue.extend({
		name: "BuildChipComp",
		props: {
			close: Boolean,
			build: Object as PropType<Build>,
			small: Boolean,
			disabled: Boolean,
			star: Boolean,
			ownProfile: Boolean,
			edit: Boolean,
		},
		data: () => ({
			chip: true,
			stars: [0, 1, 2, 3],
			selectedRole: null as number,
		}),
		computed: {
			classIcon: function(): string {
				if (this.build && this.build.class) {
					return _icons.classIcon(this.build.class.abbr);
				}
				return "";
			},
			color: function(): string {
				if (this.build && this.build.class) {
					return this.build.class.color;
				}
				return "";
			},
			roles: function(): Role[] {
				if (this.build && this.build.role != null && this.build.role.length > 0) {
					return this.build.role;
				} else {
					return [{ id: 0 }] as Role[];
				}
			},
		},
		methods: {
			togglePrefer: function(stars: number): void {
				if (this.ownProfile) {
					this.$emit("togglePrefer", stars);
				}
			},
			closeChip: function(): void {
				this.chip = false;
				this.$emit("close");
			},
			prefered: function(star: number): string {
				let color = "";

				if (star === 0) {
					color = "black";
				} else if (star === 1) {
					color = "#cd7f32";
				} else if (star === 2) {
					color = "grey";
				} else if (star === 3) {
					color = "yellow darken-3";
				}

				return color;
			},
			icon: function(star: number): string {
				if (star > 0) {
					return "star";
				} else {
					return "star_outline";
				}
			},
			roleIcon: function(role: string): string {
				if (role != null && role != "" && role.trim() != "") {
					return _icons.roleIcon(role);
				}
				return "";
			},
			selectRole: function(index: number): void {
				if (this.edit) {
					if (this.selectedRole == null || this.selectedRole != index) {
						this.selectedRole = index;
					} else {
						this.selectedRole = null;
					}
					this.$emit("selected", this.selectedRole);
				}
			},
			selected: function(index: number): boolean {
				return this.selectedRole === index;
			},
			roleChange: function(change: string): void {
				this.$emit("roleChange", change);
			},
		},
	});
</script>

<style scoped lang="scss">
	.classIcon {
		margin-left: 5px;
		margin-right: 5px;
	}

	.roleIcon {
		margin-right: 0;
	}

	.star {
		margin-left: 5px;
		margin-right: 5px;
	}

	.chip {
		padding-top: 4px;
		padding-bottom: 4px;
		margin: 5px;
	}

	.menu {
		background-color: #444444;
	}

	.highlighted {
		background-color: $menuColor;
		border-radius: 10px;
	}
</style>
