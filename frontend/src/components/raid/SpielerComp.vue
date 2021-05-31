<template>
    <div class="spieler">
        <v-avatar v-if="isRaidLead" size="25" tile class="comm">
            <img :src="icon('comm')">
        </v-avatar>
        <NameComp
            v-bind:user="user"
            class="name"
            :clickable="true">
        </NameComp>
        <v-dialog width="unset" v-if="kickable" class="button">
            <template v-slot:activator="{on}">
                <v-btn icon color="red" slot="activator" class="button" v-on="on">
                    <v-icon>clear</v-icon>
                </v-btn>
            </template>
            <div class="container">
                <p class="">Dies entfernt {{user.name}} aus dem Raid. Bist du sicher?</p>
                <v-btn color="red" @click="kick">
                    {{user.name}} entfernen
                </v-btn>
            </div>
        </v-dialog>
        <div class="builds" v-if="builds && filtered.length > 0">
			<span v-for="star in stars" :key="star" style="display: flex">
				<span v-if="prefer(star).length > 0" class="starContainer">
					<v-avatar v-if="star > 0" class="star" tile>
						<v-icon :color="starColor(star)">star</v-icon>
					</v-avatar>
					<v-avatar v-else class="star" tile>
						<v-icon color="grey">star_outline</v-icon>
					</v-avatar>
				</span>
				<div class="buildContainer">
					<BuildChipComp
						v-for="build in prefer(star)"
						:key="`${build.class.id} ${build.role.id}`" 
						:build="build" />
				</div>
				<p v-if="prefer(star).length > 0"></p>
			</span>
        </div>
        <div v-else-if="builds" class="builds">
            Keine Builds vorhanden
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _users from '../../services/endpoints/users';
    import BuildChipComp from "../profile/BuildChipComp.vue";
    import NameComp from "../menu/NameComp.vue";
    import _icons from '../../services/icons';
	import { Build } from 'models/Build';

    export default Vue.extend({
        name: "SpielerComp",
        components: {NameComp, BuildChipComp},
        props: ['user', 'filter'],
        data: () => ({
            builds: [] as Build[],
			stars: [3, 2, 1, 0]
        }),
        computed: {
            isRaidLead: function(): boolean {
                return this.user.role === 2;
            },
            filtered: function(): Build[] {
                if (this.filter) return this.builds.filter(b => this.filter.indexOf(b.role.abbr) !== -1 );
                else return this.builds;
            },
            kickable: function(): boolean {
                return this.$vStore.getters.raidRole > this.user.role;
            }
        },
        methods: {
            icon: function(name: any): string {
                return _icons.miscIcon(name);
            },
            kick: function(): void {
                this.$emit('kick', this.user);
            },
			prefer: function(preferNr: number): Build[] {
				return this.filtered.filter(b => b.prefer === preferNr);
			},
			starColor: function(starNr: number): string {
				let starColor = '';
				
				if (starNr === 1) {
					starColor = '#cd7f32';
				}
				else if (starNr === 2) {
					starColor = 'grey lighten-1';
				}
				else {
					starColor = 'yellow darken-3';
				}

				return starColor;
			}
        },
        created: async function(): Promise<void> {
            this.builds = await _users.getBuilds(this.user.id);
        }
    })
</script>

<style scoped>
    .spieler {
        background-color: #222222;
        width: 100%;
        height: 100%;
        padding: 0.5rem 0 0 1rem;
        box-shadow: 1px 1px 3px black;
    }

    .name {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .builds {
        padding-top: 1rem;
    }

    .comm {
        margin-top: -0.5rem;
    }

    .button {
        float: right;
        margin-top: -1px;
        margin-right: 3px;
    }

    .container {
        background-color: #444444;
        padding: 10px;
    }

	.star {
        margin-left: -5px;
        margin-right: -5px;
    }

	.starContainer {
		display: flex;
		align-items: center;
		flex-direction: row;
		margin-bottom: auto;
	}

	.buildContainer {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		margin: auto;
	}
</style>
