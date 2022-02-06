<template>
	<div class="changelog">
		<v-expansion-panels>
			<v-expansion-panel v-for="(version, index) in versions" :key="index">
				<v-expansion-panel-header>{{ version.version }} - {{ version.release }}</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-card color="blue-grey darken-2">
						<v-card-text>
							<ul>
								<li v-for="feature in version.features" :key="feature">
									{{ feature }}
								</li>
							</ul>
							<p v-if="version.subversions"></p>
							<v-expansion-panels v-if="version.subversions">
								<v-expansion-panel v-for="(subversion, index) in version.subversions" :key="index">
									<v-expansion-panel-header
										>{{ subversion.version }} - {{ subversion.release }}</v-expansion-panel-header
									>
									<v-expansion-panel-content>
										<v-card color="blue-grey darken-2">
											<v-card-text>
												<ul>
													<li v-for="feature in subversion.features" :key="feature">
														{{ feature }}
													</li>
												</ul>
											</v-card-text>
										</v-card>
									</v-expansion-panel-content>
								</v-expansion-panel>
							</v-expansion-panels>
						</v-card-text>
					</v-card>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import changelogs from "../../utils/changelog";

	export default Vue.extend({
		name: "ChangelogComp",
		data: () => ({
			versions: changelogs,
		}),
	});
</script>

<style scoped>
	.changelog {
		background-color: #444444;
	}
</style>
