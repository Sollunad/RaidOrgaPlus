<template>
    <div class="profilepage">
        <v-container v-if="visitedUser">
            <v-layout row wrap>
                <v-flex xs12 md2>
                    <ProfilePictureComp
                        v-bind:user="visitedUser"
                        v-bind:ownProfile="ownProfile">
                    </ProfilePictureComp>
                </v-flex>
                <v-flex xs12 md10>
                    <ProfileNameComp
                            class="username"
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile"
                            v-on:changeName="changeName">
                    </ProfileNameComp>
                    <p></p>
                    <BuildsComp
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile">
                    </BuildsComp>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import ProfileNameComp from "../components/profile/ProfileNameComp";
    import BuildsComp from "../components/profile/BuildsComp";
    import ProfilePictureComp from "../components/profile/ProfilePictureComp";
    import _users from '../services/endpoints/users';

    export default {
        name: "UserProfilePage",
        components: {ProfilePictureComp, BuildsComp, ProfileNameComp},
        props: ['user'],
        data: () => ({
            visitedUser: null
        }),
        computed: {
            visitedID: function() {
                return this.$route.params.id;
            },
            ownProfile: function() {
                if (this.visitedUser) {
                    return this.visitedUser.id === this.user.id;
                }
                return false;
            }
        },
        methods: {
            changeName: function(name) {
                this.$emit('changeName', name);
            }
        },
        created: async function() {
            this.visitedUser = this.visitedID? await _users.getWithID(this.visitedID) : this.user;
        }
    }
</script>

<style scoped>
    .profilepage {
        margin: 5%;
    }

    .username {
        margin-bottom: 40px;
    }
</style>