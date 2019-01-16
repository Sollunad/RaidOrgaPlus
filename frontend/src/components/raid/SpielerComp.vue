<template>
    <div class="spieler">
        <NameComp
            v-bind:user="user"
            class="name">
        </NameComp>
        <div class="builds" v-if="builds && filtered.length > 0">
            <BuildChipComp
                    v-for="build in prefer"
                    v-bind:key="`${build.class.id} ${build.role.id}`"
                    v-bind:build="build"
                    disabled
            >
            </BuildChipComp>
            <p></p>
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

    export default {
        name: "ListSpielerComp",
        components: {NameComp, BuildChipComp},
        props: ['user', 'filter'],
        asyncComputed: {
            builds: function() {
                if (this.user) return _users.getBuilds(this.user.id);
            }
        },
        computed: {
            filtered: function() {
                if (this.filter) return this.builds.filter(b => b.role.abbr === this.filter);
                else return this.builds;
            },
            prefer: function() {
                return this.filtered.filter(b => b.prefer);
            },
            notPrefer: function() {
                return this.filtered.filter(b => !b.prefer);
            }
        }
    }
</script>

<style scoped>
    .spieler {
        background-color: #222222;
        width: 100%;
        height: 100%;
    }

    .name {
        font-size: 20px;
        font-weight: bold;
        padding: 0.5rem 1rem;
    }

    .builds {
        padding: 0 0 1rem 1rem;
    }
</style>