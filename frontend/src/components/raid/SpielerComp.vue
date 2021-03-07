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
            <BuildChipComp
                    v-for="build in prefer"
                    v-bind:key="`${build.class.id} ${build.role.id}`"
                    v-bind:build="build"
            >
            </BuildChipComp>
            <p v-if="prefer.length > 0"></p>
            <BuildChipComp
                    v-for="build in notPrefer"
                    v-bind:key="`${build.class.id} ${build.role.id}`"
                    v-bind:build="build"
                    :small="true"
            >
            </BuildChipComp>
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

    export default Vue.extend({
        name: "SpielerComp",
        components: {NameComp, BuildChipComp},
        props: ['user', 'filter'],
        data: () => ({
            builds: [] as any[]
        }),
        computed: {
            isRaidLead: function(): boolean {
                return this.user.role === 2;
            },
            filtered: function(): any[] {
                if (this.filter) return this.builds.filter(b => this.filter.indexOf(b.role.abbr) !== -1 );
                else return this.builds;
            },
            prefer: function(): any {
                return this.filtered.filter(b => b.prefer);
            },
            notPrefer: function(): any {
                return this.filtered.filter(b => !b.prefer);
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
        padding: 0.5rem 0 1rem 1rem;
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
</style>
