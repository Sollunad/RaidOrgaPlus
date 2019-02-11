<template>
    <div class="spieler">
        <v-avatar v-if="isRaidLead" size="25" tile class="comm">
            <img :src="icon('comm')">
        </v-avatar>
        <NameComp
            v-bind:user="user"
            class="name">
        </NameComp>
        <v-btn flat icon color="red" @click="kick" class="button" v-if="kickable">
            <v-icon>clear</v-icon>
        </v-btn>
        <div class="builds" v-if="builds && filtered.length > 0">
            <BuildChipComp
                    v-for="build in prefer"
                    v-bind:key="`${build.class.id} ${build.role.id}`"
                    v-bind:build="build"
                    disabled
            >
            </BuildChipComp>
            <p v-if="prefer.length > 0"></p>
            <BuildChipComp
                    v-for="build in notPrefer"
                    v-bind:key="`${build.class.id} ${build.role.id}`"
                    v-bind:build="build"
                    small disabled
            >
            </BuildChipComp>
        </div>
        <div v-else-if="builds" class="builds">
            Keine Builds vorhanden
        </div>
    </div>
</template>

<script>
    import _users from '../../services/endpoints/users';
    import BuildChipComp from "../profile/BuildChipComp";
    import NameComp from "../menu/NameComp";
    import _icons from '../../services/icons';

    export default {
        name: "ListSpielerComp",
        components: {NameComp, BuildChipComp},
        props: ['user', 'filter', 'role'],
        asyncComputed: {
            builds: function() {
                if (this.user) return _users.getBuilds(this.user.id);
            }
        },
        computed: {
            isRaidLead: function() {
                return this.user.role === 2;
            },
            filtered: function() {
                if (this.filter) return this.builds.filter(b => b.role.abbr === this.filter);
                else return this.builds;
            },
            prefer: function() {
                return this.filtered.filter(b => b.prefer);
            },
            notPrefer: function() {
                return this.filtered.filter(b => !b.prefer);
            },
            kickable: function() {
                return this.role > this.user.role;
            }
        },
        methods: {
            icon: function(name) {
                return _icons.miscIcon(name);
            },
            kick: function() {
                this.$emit('kick', this.user);
            }
        }
    }
</script>

<style scoped>
    .spieler {
        background-color: #222222;
        width: 100%;
        height: 100%;
        padding: 0.5rem 0 1rem 1rem;
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
        margin-top: 0;
    }
</style>