<template>
    <div>
        <v-chip-group
                multiple
                column
                active-class="activeChip"
                class="suche"
                v-model="activeFilter"
        >
            <v-chip filter v-for="filter in filterList" :key="filter">
                {{ filter }}
            </v-chip>
        </v-chip-group>
        <v-container>
            <v-layout row wrap>
                <v-flex xs12 sm6>
                    <v-text-field
                            outline
                            class="suche"
                            label="Suche nach Spielern"
                            prepend-inner-icon="search"
                            v-model="filterText"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field
                            outline
                            class="suche"
                            label="Suche nach Rollen"
                            prepend-inner-icon="search"
                            v-model="roleText"
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-container>
        <div v-if="users.length > 0" class="suche">
            Zeige {{filteredUsers.length}} / {{users.length}}
        </div>
        <v-expansion-panels class="list">
            <v-expansion-panel v-for="user in filteredUsers" :key="user.accname">
                <v-expansion-panel-header>
                    <ModListUserHeaderComp
                            v-bind:user="user">
                    </ModListUserHeaderComp>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <ModListUserBodyComp
                            class="listRowBody"
                            v-bind:user="user">
                    </ModListUserBodyComp>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import _moderation from '../../services/endpoints/moderation';
    import ModListUserHeaderComp from "./ModListUserHeaderComp.vue";
    import ModListUserBodyComp from "./ModListUserBodyComp.vue";
	import { ExtraAccount } from 'models/ExtraAccount';

    export default Vue.extend({
        name: "ModUserListComp",
        components: {ModListUserBodyComp, ModListUserHeaderComp},
        data: () => ({
            users: [] as any[],
            open: false,
            filterText: '',
            roleText: '',
            filterList: [
                'Mit Discord',
                'Ohne Discord',
                '14 Tage inaktiv',
                '1. Raid vier Wochen her',
            ],
            activeFilter: [0],
        }),
        computed: {
            filteredUsers: function(): any[] {
                return this.users.filter(u => this.isInFilter(u));
            }
        },
        methods: {
            isInFilter: function (user: any): boolean {
                return this.isInNameFilter(user) && this.isInChipFilter(user) && this.isInRoleFilter(user);
            },
            isInChipFilter: function(user: any): boolean {
                for (const filter of this.activeFilter) {
                    const filterString = this.filterList[filter];
                    let currentTruth;
                    if (filterString === 'Mit Discord') {
                        currentTruth = this.hasDiscord(user);
                    } else if (filterString === 'Ohne Discord') {
                        currentTruth = !this.hasDiscord(user);
                    } else if (filterString === '14 Tage inaktiv') {
                        currentTruth = this.twoWeeksInactive(user);
                    } else if (filterString === '1. Raid vier Wochen her') {
                        currentTruth = this.firstRaidFourWeeks(user);
                    }
                    if (!currentTruth) return false;
                }
                return true;
            },
            isInNameFilter: function(user: any): boolean {
                const name = user.name.toLowerCase();
                const accname = user.accname.toLowerCase();
                const searchText = this.filterText.toLowerCase();
				let inExtraAccounts = false;

				if (user.extraAccounts && user.extraAccounts.length > 0) {
					inExtraAccounts = user.extraAccounts.find(
						(e: ExtraAccount) => e.accName.toLowerCase().indexOf(searchText) > -1);
				}

                return name.indexOf(searchText) > -1 ||
                    accname.indexOf(searchText) > -1 || inExtraAccounts;
            },
            isInRoleFilter: function(user: any): boolean {
                if (this.roleText === '') return true;
                if (!user.discord) return false;
                const searchText = this.roleText.toLowerCase();
                return !!user.discord.roles.find((r: any) => r.name.toLowerCase().indexOf(searchText) > -1)
            },
            hasDiscord: function(user: any): boolean {
                return !!user.discord;
            },
            twoWeeksInactive: function(user: any): boolean {
                const date = new Date(user.lastActive);
                const diff = new Date().getDate() - date.getDate();
                return diff > 1000 * 60 * 60 * 24 * 14;
            },
            firstRaidFourWeeks: function(user: any): boolean {
                if (!user.firstTermin) return false;
                const date = new Date(user.firstTermin);
                const diff = new Date().getDate() - date.getDate();
                return diff > 1000 * 60 * 60 * 24 * 28;
            },
        },
        created: async function(): Promise<void> {
            this.users = await _moderation.getUsers();
        }
    })
</script>

<style scoped>
    .listRowBody {
        margin: 0 0 1% 1%;
    }
    .suche {
        margin: 0 10px;
    }
    .activeChip {
        font-weight: bold;
        color: lightblue;
    }
    .list {
        margin-top: 10px;
    }
</style>