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
                    <v-divider></v-divider>
                    <div v-if="hasNoApi">
                        <p>Gib einen API-Key im Profil an, um hier deinen wöchentlichen Raid-Progress zu sehen!</p>
                    </div>
                    <div v-else class="progress">
                        <ProgressShareComp v-if="ownProfile" class="shareSwitch" v-bind:user="user"></ProgressShareComp>
                        <v-container>
                            <v-layout row wrap>
                                <v-flex xs12 md6>
                                    <ProgressComp
                                            v-bind:user="visitedUser"
                                            v-bind:ownProfile="ownProfile"
                                            class="homecomp">
                                    </ProgressComp>
                                </v-flex>
                                <v-flex xs12 md6>
                                    <InsightsComp
                                            v-bind:user="visitedUser"
                                            v-bind:ownProfile="ownProfile"
                                            class="homecomp">
                                    </InsightsComp>
                                </v-flex>
                            </v-layout>
                        </v-container>
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
    import ProgressComp from "../components/profile/ProgressComp";
    import InsightsComp from "../components/profile/InsightsComp";
    import ProgressShareComp from "../components/profile/ProgressShareComp";

    export default {
        name: "UserProfilePage",
        components: {ProgressShareComp, InsightsComp, ProgressComp, ProfilePictureComp, BuildsComp, ProfileNameComp},
        props: ['user'],
        data: () => ({
            visitedUser: null,
            hasNoApi: null,
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
                if (window.innerWidth > 1510) {
                    return 128;
                } else if (window.innerWidth > 1263) {
                    return 112;
                } else {
                    return 96;
                }
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
        }
    }
</script>

<style scoped>
    .profilepage {
        margin: 4%;
    }

    .username {
        margin-bottom: 40px;
    }

    .builds {
        margin-bottom: 30px;
    }

    .progress {
        margin-left: -10px;
    }

    @media only screen and (max-width: 1263px) {
        .profilePicture {
            margin-bottom: 30px;
        }
    }

    @media only screen and (min-width: 580px) {
        .shareSwitch {
            float: right;
        }
    }
</style>