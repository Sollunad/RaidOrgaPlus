<template>
    <div class="container">
        <v-container>
            <v-layout row wrap>
                <v-flex
                        v-for="(role, index) in roles"
                        :key="index"
                        xs4 sm2>
                    <BuildFilterButtonComp
                           class="button"
                           v-bind:role="role"
                           v-bind:picked="isPicked(role)"
                           v-on:click="click">
                    </BuildFilterButtonComp>
                </v-flex>
            </v-layout>
        </v-container>
        <v-btn small round v-if="picked.length > 0" @click="reset">
            Reset
        </v-btn>
    </div>
</template>

<script>
    import BuildFilterButtonComp from "./BuildFilterButtonComp";

    export default {
        name: "BuildFilterButtons",
        components: {BuildFilterButtonComp},
        data: () => ({
            roles: ['P', 'C', 'T', 'H', 'U', 'B'],
            picked: [],
        }),
        methods: {
            click: function(role) {
                if (!this.isPicked(role)) {
                    this.picked.push(role);
                } else {
                    this.picked = this.picked.filter(r => r !== role);
                }
                this.$emit('setFilter', this.roleString());
            },
            isPicked: function(role) {
                return this.picked.indexOf(role) !== -1;
            },
            roleString: function() {
                return this.picked.join('');
            },
            reset: function() {
                this.picked = [];
                this.$emit('setFilter', this.roleString());
            }
        }
    }
</script>

<style scoped>
    .container {
        width: fit-content;
        margin-right: 0;
        margin-top: -40px;
        margin-bottom: -20px;
    }

    @media only screen and (max-width: 599px) {
        .container {
            width: fit-content;
            margin-left: 0;
            margin-top: -10px;
            margin-bottom: -20px;
        }
    }

    @media only screen and (min-width: 600px) {
        .container {
            width: fit-content;
            margin-right: 0;
            margin-top: -40px;
            margin-bottom: -20px;
        }
    }
</style>