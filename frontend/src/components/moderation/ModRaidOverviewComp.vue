<template>
	<v-dialog width="90%" v-model="open">
		<template v-slot:activator="{ on }">
			<v-btn color="success" v-on="on" class="overviewButton">
				Raid Overview
			</v-btn>
		</template>
		<v-card>
			<v-card-title>
				Raid Overview
			</v-card-title>
			<v-card-text>
				<div class="container">
					<div v-for="(modRaid, idx) in raids" :key="idx" class="innerContainer">
						<h2 class="header">{{ modRaid.name }}</h2>
						<div class="leadOverview">
							<span>Raid Leitung:</span>
							<ul class="bulletList">
								<li v-for="leader in getLeader(modRaid)" :key="`${idx}-${leader.id}`">
									<span> {{ leader.name }} | {{ leader.accname }} </span>
								</li>
							</ul>
						</div>
						<div class="leadOverview">
							<span>Lieutenants:</span>
							<ul class="bulletList">
								<li v-for="lieutenant in getLieutenants(modRaid)" :key="`${idx}-${lieutenant.id}`">
									<span> {{ lieutenant.name }} | {{ lieutenant.accname }} </span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="blue darken-1" text @click="open = false">
					Close
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
	import Vue, { PropType } from "vue";
	import { ModRaid } from "models/Raid";
	import { Spieler } from "models/Spieler";

	export default Vue.extend({
		name: "ModRaidOverviewComp",
		data: () => ({
			open: false
		}),
		props: {
			raids: Array as PropType<ModRaid[]>
		},
		computed: {},
		methods: {
			getLeader: function(raid: ModRaid): Spieler[] {
				return raid.spieler.filter(s => s.role === 2);
			},
			getLieutenants: function(raid: ModRaid): Spieler[] {
				return raid.spieler.filter(s => s.role === 1);
			},
			hasLieutenants: function(raid: ModRaid): boolean {
				return raid.spieler.filter(s => s.role === 1).length > 0;
			}
		}
	});
</script>

<style scoped>
	.container {
		display: flex;
		font-size: 16px;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.innerContainer {
		margin-bottom: 24px;
		width: 250px;
	}

	.leadOverview {
		margin-top: 12px;
	}

	.header {
		font-style: italic;
		text-decoration: underline;
	}

	.bulletList {
		margin-left: 12px;
	}

	.overviewButton {
		margin: 5px 0 10px 10px;
	}
</style>
