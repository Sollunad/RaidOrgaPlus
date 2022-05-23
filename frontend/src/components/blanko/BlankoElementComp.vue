<template>
	<div>
		<v-menu :close-on-content-click="false" v-model="classMenuOpen" v-if="role > 0">
			<template v-slot:activator="{ on }">
				<v-avatar :size="20" :tile="true" class="avatar" v-on="on" @contextmenu.prevent="clearClass">
					<img :src="emptyIcon" v-if="classIcon === ''" />
					<img :src="classIcon" v-else />
				</v-avatar>
			</template>
			<MenuClassComp v-on:pick="pickClass" />
		</v-menu>
		<v-avatar :size="20" :tile="true" class="avatar" v-else>
			<img :src="emptyIcon" v-if="classIcon === ''" />
			<img :src="classIcon" v-else />
		</v-avatar>
		<template v-if="role > 0">
			<v-menu v-for="(role, idx) in this.roles" :key="idx">
				<template v-slot:activator="{ on }">
					<v-avatar :size="20" :tile="true" class="avatar" v-on="on" @contextmenu.prevent="clearRole(idx)">
						<img :src="emptyIcon" v-if="role.id === 0" />
						<img :src="roleIcon(role)" v-else />
					</v-avatar>
				</template>
				<MenuRoleComp v-on:pick="pickRole($event, idx)" :showStar="true" :showSupports="true" />
			</v-menu>
			<v-btn color="green" fab width="24px" height="24px" @click="addRole" v-if="this.roles.length < 4">
				<v-icon>add</v-icon>
			</v-btn>
			<v-btn
				fab
				color="red"
				width="24px"
				height="24px"
				style="margin-left: 4px"
				@click="removeRole"
				v-if="this.roles.length > 1"
			>
				<v-icon>remove</v-icon>
			</v-btn>
		</template>
		<v-avatar v-for="(role, idx) in this.roles" :key="idx" :size="20" :tile="true" class="avatar" v-else>
			<img :src="emptyIcon" v-if="role.id === 0" />
			<img :src="roleIcon(role)" v-else />
		</v-avatar>
	</div>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import _icons from "../../services/icons";
	import _blankos from "../../services/endpoints/blankos";
	import MenuClassComp from "../aufstellung/MenuClassComp.vue";
	import MenuRoleComp from "../aufstellung/MenuRoleComp.vue";
	import { blankoElement, userRaid } from "models/Types";
	import { Encounter } from "../../../../models/Encounter";
	import { Role } from "models/Rolle";

	export default Vue.extend({
		name: "BlankoElementComp",
		components: { MenuRoleComp, MenuClassComp },
		props: {
			raid: Object as PropType<userRaid>,
			boss: Object as PropType<Encounter>,
			position: Number,
			propElement: Object as PropType<blankoElement>,
			role: Number,
		},
		data: () => ({
			classMenuOpen: false,
			editedElement: null as blankoElement,
		}),
		computed: {
			element: function(): blankoElement {
				if (this.editedElement) {
					return this.editedElement;
				} else if (this.propElement) {
					return this.propElement;
				} else {
					return null;
				}
			},
			classIcon: function(): string {
				if (this.element && this.element.class !== "") return _icons.classIcon(this.element.class);
				else return "";
			},
			emptyIcon: function(): string {
				return _icons.miscIcon("empty");
			},
			roles: function(): Role[] {
				if (this.element != null && this.element.roles != null && this.element.roles.length > 0) {
					return this.element.roles;
				} else {
					return [{ id: 0 }] as Role[];
				}
			},
		},
		methods: {
			pickClass: async function(clss: any): Promise<void> {
				this.classMenuOpen = false;
				this.prepareEditedElement();
				this.editedElement.class = clss.abbr;
				await _blankos.setClass(this.raid.id, this.boss.id, this.position, clss.id);
			},
			clearClass: async function(): Promise<void> {
				this.prepareEditedElement();
				this.editedElement.class = "";
				await _blankos.setClass(this.raid.id, this.boss.id, this.position, 0);
			},
			pickRole: async function(role: Role, index: number): Promise<void> {
				this.prepareEditedElement();
				this.editedElement.roles.splice(index, 1, role);
				const roles = this.editedElement.roles.map(r => r.id).join(', ');
				await _blankos.setRole(this.raid.id, this.boss.id, this.position, roles);
			},
			clearRole: async function(index: number): Promise<void> {
				this.prepareEditedElement();
				this.editedElement.roles.splice(index, 1, { id: 0 } as Role);
				const roles = this.editedElement.roles.map(r => r.id).join(', ');
				await _blankos.setRole(this.raid.id, this.boss.id, this.position, roles);
			},
			addRole: async function(): Promise<void> {
				this.prepareEditedElement();
				this.editedElement.roles.push({ id: 0 } as Role);
				const roles = this.editedElement.roles.map(r => r.id).join(', ');
				await _blankos.setRole(this.raid.id, this.boss.id, this.position, roles);
			},
			removeRole: async function(): Promise<void> {
				this.prepareEditedElement();
				this.editedElement.roles.pop();
				const roles = this.editedElement.roles.map(r => r.id).join(', ');
				await _blankos.setRole(this.raid.id, this.boss.id, this.position, roles);
			},
			prepareEditedElement: function(): void {
				if (!this.element) {
					this.editedElement = { class: "", roles: [{ id: 0 }] } as blankoElement;
				} else {
					this.editedElement = this.element;
				}
			},
			roleIcon: function(role: Role): string {
				if (role != null) {
					return _icons.roleIcon(role.abbr);
				}
				else {
					return "";
				}
			},
		},
		watch: {
			propElement: function(): void {
				this.editedElement = null;
			},
		},
	});
</script>

<style scoped>
	.avatar {
		margin: 0 0.2rem;
	}
</style>
