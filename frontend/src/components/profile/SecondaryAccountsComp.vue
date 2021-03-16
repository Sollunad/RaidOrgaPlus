<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on }">
			<v-btn v-on="on"> Accounts Verknüpfen </v-btn>
		</template>

		<v-container class="container">
			<p v-for="(acc, i) in accounts" :key="i">
				<span> {{ acc.accName }} </span>
			</p>
			<v-form ref="form" v-model="valid" lazy-validation class="form">
				<v-layout>
					<v-flex xs8 lg8>
						<v-text-field
							@keypress.enter.prevent="submit"
							v-model="accName"
							:rules="accNameRules"
							label="Accountname"
							required
						>
						</v-text-field>
					</v-flex>
					<v-flex class="addButton" xs4 lg4>
						<v-btn @click.prevent="submit">
							+
						</v-btn>
					</v-flex>
				</v-layout>
			</v-form>
		</v-container>
	</v-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

import type { VForm } from '@/models/Types';
import _users from '@/services/endpoints/users';
import { ExtraAccount } from 'models/ExtraAccount';

export default Vue.extend({
	name: "SecondaryAccountsComp",
	data: () => ({
		dialog: false,
		accounts: [] as ExtraAccount[],
		valid: true,
		accName: '',
		accNameRules: [
			(v: string) => !!v || 'Bitte gib deinen Accountnamen an',
			(v: string) => /^[a-zA-Z\s]+\.\d{4}$/.test(v) || 'Bitte gib einen gültigen Accountnamen an',
		],
	}),
	computed: {
		form: function(): VForm {
			return this.$refs.form as VForm;
		}
	},
	methods: {
		async submit(): Promise<void> {
			if (this.form.validate()) {
				let index = this.accounts.findIndex(acc => acc.accName === this.accName);
				if (index === -1) {
					const id = (await _users.addExtraAccount(this.accName)).id;
					this.accounts.push({ accName: this.accName, id: id });
					this.form.reset();
				}
			}
		},
	},
	created: async function(): Promise<void> {
		this.accounts = await _users.getExtraAccounts();
	}
})
</script>

<style scoped>
	.container {
		background-color: #444444;
		padding: 10px;
	}

	.addButton {
		display: flex;
		margin: auto;
		justify-content: center;
	}
</style>