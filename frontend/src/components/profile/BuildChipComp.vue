<template>
    <v-chip
            :close="close" :small="small" :disabled="disabled" :color="color" v-model="chip" @click:close="closeChip" light class="chip elevation-12">
        <v-avatar class="classIcon" tile>
            <img :src="classIcon" v-if="classIcon">
        </v-avatar>
        <v-avatar class="roleIcon" tile>
            <img :src="roleIcon" v-if="roleIcon">
        </v-avatar>

		<v-menu offset-y v-if="star">
			<template v-slot:activator="{ on }">
				<span v-on="on">
					<v-avatar class="star" tile>
						<v-icon :color="prefered(build.prefer)">{{icon(build.prefer)}}</v-icon>
					</v-avatar>
				</span>
			</template>
			<v-container grid-list-sm class="menu">
				<v-layout column wrap>
					<v-flex v-for="star in stars" :key="star" xs4 @click="togglePrefer(star)">
						<v-avatar class="star" tile>
							<v-icon :color="prefered(star)">{{icon(star)}}</v-icon>
						</v-avatar>
					</v-flex>
				</v-layout>
			</v-container>
		</v-menu>
    </v-chip>
</template>

<script lang="ts">
	import { Build } from 'models/Build';
	import Vue, { PropType } from 'vue';
    import _icons from '../../services/icons';

    export default Vue.extend({
        name: "BuildChipComp",
		props: {
			close: Boolean,
			build: Object as PropType<Build>,
			small: Boolean,
			disabled: Boolean,
			star: Boolean,
			ownProfile: Boolean
		},
        data: () => ({
            chip: true,
			stars: [ 0, 1, 2, 3 ]
        }),
        computed: {
            classIcon: function(): string {
                if (this.build && this.build.class) return _icons.classIcon(this.build.class.abbr);
                else return '';
            },
            roleIcon: function(): string {
                if (this.build && this.build.role) return _icons.roleIcon(this.build.role.abbr);
                else return '';
            },
            color: function(): string {
                if (this.build && this.build.class) return this.build.class.color;
                else return '';
            }
        },
        methods: {
            togglePrefer: function(stars: number): void {
                if (this.ownProfile) {
                    this.$emit('togglePrefer', stars);
                }
            },
            closeChip: function(): void {
                this.chip = false;
                this.$emit('close');
            },
			prefered: function(star: number): string {
				let color = '';

				if (star === 0) {
					color = 'black';
				}
				else if (star === 1) {
					color = '#cd7f32';
				}
				else if (star === 2) {
					color = 'grey';
				}
				else if (star === 3) {
					color = 'yellow darken-3';
				}

				return color;
			},
			icon: function(star: number): string {
				if (star > 0) {
					return 'star';
				}
				else {
					return 'star_outline';
				}
			}
        }
    })
</script>

<style scoped>
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
</style>