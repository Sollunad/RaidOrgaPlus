<template>
    <div class="profilepage">
        <v-container v-if="visitedUser">
            <v-layout row wrap>
                <v-flex xs12 lg2>
                    <ProfilePictureComp
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile"
                            v-bind:size="profilePictureSize"
                            class="profilePicture">
                    </ProfilePictureComp>
                </v-flex>
                <v-flex xs12 lg10>
                    <ProfileNameComp
                            class="username"
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile"
                            v-on:changeName="changeName">
                    </ProfileNameComp>
                    <p></p>
                    <BuildsComp
                            class="builds"
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile">
                    </BuildsComp>
                    <div v-if="hasNoApi && ownProfile">
                        <p>Gib einen API-Key in den Einstellungen an, um hier deinen wöchentlichen Raid-Progress und Erfolge zu sehen!</p>
                    </div>
                    <div v-else-if="showProgress">
                        <ProgressShareComp v-if="ownProfile" class="shareSwitch" v-bind:user="user"></ProgressShareComp>
                        <ProgressOverviewComp
                            v-bind:user="visitedUser"
                            v-bind:ownProfile="ownProfile"
                            v-bind:width="width">
                        </ProgressOverviewComp>
                    </div>
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

    import ProgressShareComp from "../components/profile/ProgressShareComp";
    import ProgressOverviewComp from "../components/profile/ProgressOverviewComp";

    export default {
        name: "UserProfilePage",
        components: {ProgressOverviewComp, ProgressShareComp, ProfilePictureComp, BuildsComp, ProfileNameComp},
        props: ['user', 'width'],
        data: () => ({
            visitedUser: null,
            hasNoApi: null,
            hasShared: false
        }),
        computed: {
            visitedID: function () {
                return this.$route.params.id;
            },
            ownProfile: function () {
                if (this.visitedUser) {
                    return this.visitedUser.id === this.user.id;
                }
                return false;
            },
            profilePictureSize: function() {
                if (this.width > 1510) {
                    return 128;
                } else if (this.width > 1263) {
                    return 112;
                } else {
                    return 96;
                }
            },
            showProgress: function() {
                return this.ownProfile || this.hasShared;
            }
        },
        methods: {
            changeName: function (name) {
                this.$emit('changeName', name);
            }
        },
        created: async function () {
            this.visitedUser = this.visitedID ? await _users.getWithID(this.visitedID) : this.user;
            this.hasNoApi = !(await _users.hasApi());
            this.hasShared = await _users.hasProgressShared(this.visitedID);
        }
    }
</script>

<style scoped>


    .username {
        margin-bottom: 40px;
    }

    .builds {
        margin-bottom: 30px;
    }

    @media only screen and (max-width: 1263px) {
        .profilePicture {
            margin-bottom: 30px;
        }
    }

    @media only screen and (min-width: 600px) {
        .profilepage {
            margin: 4%;
        }
    }
</style>