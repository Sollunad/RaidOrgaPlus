<template>
    <div>
		<div class="headline heading">
			Spieler Rang
		</div>
		<v-btn-toggle
			mandatory rounded v-model="role" class="btnGroup" @change="change">
			<v-btn :disabled="disabled">
				Raider
			</v-btn>
			<v-btn :disabled="disabled">
				MAZ
			</v-btn>
			<v-btn :disabled="disabled">
				Moderator
			</v-btn>
		</v-btn-toggle>
    </div>
</template>

<script lang="ts">
	import Vue, { PropType } from 'vue';
    import _moderation from '../../services/endpoints/moderation';
	import { UserRole } from '../../../../models/Enums'
	import { Spieler } from 'models/Spieler';

    export default Vue.extend({
        name: "ModListUserEditRoleComp",
		props: {
			user: Object as PropType<Spieler>,
		},
        data: () => ({
			role: UserRole.Normal
        }),
		computed: {
			disabled: function(): boolean {
				return this.$vStore.getters.loggedInUser.role <= UserRole.Maz;
			}
		},
        methods: {
			change: async function(): Promise<void> {
				await _moderation.updateSpielerRole(this.user.id, this.role);
			}
        },
        created: async function (): Promise<void> {
			this.role = this.user.role;
        }
    })
</script>

<style scoped>
	.btnGroup {
		margin-top: 15px;
	}

	.heading {
        margin: 10px 0;
    }
</style>
