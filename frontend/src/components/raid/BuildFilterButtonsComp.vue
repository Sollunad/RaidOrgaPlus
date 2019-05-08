<template>
    <div class="container">
        <BuildFilterButtonComp v-for="role in roles"
            v-bind:role="role"
            v-bind:picked="isPicked(role)"
            v-on:click="click">
         </BuildFilterButtonComp>
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
        align-content: center;
    }
</style>