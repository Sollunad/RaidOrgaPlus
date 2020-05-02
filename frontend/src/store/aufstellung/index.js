import _termine from "../../services/endpoints/termine";
import _aufstellungen from "../../services/endpoints/aufstellungen";
import WSClient from "../../services/websocket";
import _raids from "../../services/endpoints/raids";

export default {
    state: {
        isActive: null,
        aufstellungen: null,
        elements: [],
        locked: false,
        anmeldungen: [],
        anmeldung: {},
        wsClient: null,
        ersatzspieler: [],
        invitablePlayers: [],
        uploadActive: false,
        openDialog: null,
    },
    mutations: {
        setActive: function(state, isActive) {
            state.isActive = isActive;
        },
        setAufstellungen: function(state, aufstellungen) {
            state.aufstellungen = aufstellungen;
        },
        setElements: function(state, elements) {
            state.elements = elements;
        },
        setLocked: function(state, locked) {
            state.locked = locked;
        },
        setAnmeldungen: function(state, anmeldungen) {
            state.anmeldungen = anmeldungen;
        },
        setAnmeldung: function(state, anmeldung) {
            state.anmeldung = anmeldung;
        },
        startWSClient: function(state, termin) {
            state.wsClient = new WSClient(termin.id);
        },
        setErsatzspieler: function(state, ersatzspieler) {
            state.ersatzspieler = ersatzspieler;
        },
        setInvitablePlayers: function(state, invitablePlayers) {
            state.invitablePlayers = invitablePlayers;
        },
        toggleUpload: function(state) {
            state.uploadActive = !state.uploadActive;
        },
        setOpenDialog: function(state, dialog) {
            state.openDialog = dialog;
        },
        toggleLocked: function(state) {
            state.locked = !state.locked;
        }
    },
    actions: {
        loadAufstellungen: async function(context) {
            const termin = context.getters.termin;
            const raid = context.getters.raid;
            context.dispatch('closeDialog');
            context.commit('setActive', !await _termine.isArchived(termin.id));
            context.commit('setAufstellungen', await _aufstellungen.getForTermin(termin.id));
            context.commit('setElements', await _aufstellungen.getElements(termin.id));
            if (context.getters.isActive) {
                context.commit('setLocked', await _termine.isLocked(termin.id));
                context.commit('setAnmeldungen', await _termine.getAnmeldungenForTermin(termin.id));
                context.commit('setAnmeldung', await _termine.getAnmeldungForSpieler(termin.id));
                context.commit('setErsatzspieler', await _termine.getErsatz(termin.id));
                context.commit('setInvitablePlayers', await _raids.invitablePlayers(raid.id));
                context.commit('startWSClient', termin);
            }
        },
        clearWS: function(context) {
            if (context.getters.wsClient) {
                context.getters.wsClient.output = null;
            }
        },
        closeWS: function(context) {
            if (context.getters.wsClient) {
                context.getters.wsClient.close();
            }
        },
        updateErsatz: async function(context, newValue) {
            const oldValue = context.getters.ersatzIds;
            const termin = context.getters.termin;
            if (oldValue !== null) {
                const invitedPlayer = newValue.find(player => !oldValue.includes(player));
                const deletedPlayer = oldValue.find(player => !newValue.includes(player));
                if (invitedPlayer) {
                    await _termine.addErsatz(termin.id, invitedPlayer);
                } else if (deletedPlayer) {
                    await _termine.deleteErsatz(termin.id, deletedPlayer);
                }
            }

            const newErsatzspieler = context.getters.invitablePlayers.filter(p => newValue.includes(p.id));
            context.commit('setErsatzspieler', newErsatzspieler);
        },
        anmelden: async function(context, type) {
            const user = context.getters.loggedInUser;
            const termin = context.getters.termin;
            const changedAnmeldung = context.getters.anmeldungen.find(a => a.id === user.id);
            if (changedAnmeldung) changedAnmeldung.type = type;
            else context.getters.anmeldungen.push({id: user.id, name: user.name, type: type});
            await _termine.anmelden(termin.id, type);
            context.dispatch('wsSendRefresh');
        },
        refresh: async function(context) {
            const termin = context.getters.termin;
            const raid = context.getters.raid;
            context.commit('setAufstellungen', await _aufstellungen.getForTermin(termin.id));
            context.commit('setElements', await _aufstellungen.getElements(termin.id));
            context.commit('setLocked', await _termine.isLocked(termin.id));
            context.commit('setAnmeldungen', await _termine.getAnmeldungenForTermin(termin.id));
            context.commit('setAnmeldung', await _termine.getAnmeldungForSpieler(termin.id));
            context.commit('setErsatzspieler', await _termine.getErsatz(termin.id));
            context.commit('setInvitablePlayers', await _raids.invitablePlayers(raid.id));
        },
        wsSendRefresh: function(context) {
            if (context.getters.wsClient) {
                context.getters.wsClient.sendRefresh();
            }
        },
        toggleUpload: function(context) {
            context.commit('toggleUpload');
        },
        addBoss: async function(context, info) {
            const [boss, wing] = info;
            const termin = context.getters.termin;
            if (boss === 0) {
                context.commit('setAufstellungen', await _termine.addWing(termin.id, wing));
                context.commit('setElements', await _aufstellungen.getElements(this.termin.id));
            } else {
                context.commit('setAufstellungen', await _termine.addBoss(termin.id, boss));
                context.commit('setElements', await _aufstellungen.getElements(this.termin.id));
            }
            context.dispatch('wsSendRefresh')
        },
        deleteBoss: async function(context, aufstellung) {
            const termin = context.getters.termin;
            context.commit('setAufstellungen', await _aufstellungen.deleteBoss(aufstellung.id, termin.id));
            context.dispatch('wsSendRefresh');
        },
        openDialog: function(context, dialog) {
            context.commit('setOpenDialog', dialog);
        },
        closeDialog: function(context) {
            context.commit('setOpenDialog', null);
        },
        archive: async function(context, newTermin) {
            context.dispatch('closeDialog');
            if (newTermin) {
                context.dispatch('createNewTermin');
            }
            await _termine.archive(context.getters.termin.id);
            window.history.back();
        },
        delete: async function(context, newTermin) {
            context.dispatch('closeDialog');
            if (newTermin) {
                context.dispatch('createNewTermin');
            }
            await _termine.deleteTermin(context.getters.termin.id);
            window.history.back();
        },
        createNewTermin: async function(context) {
            const termin = context.getters.termin;
            const raid = context.getters.raid;
            const oldDate = termin.date.slice(4);
            const dmy = oldDate.split('.');
            const date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
            // I have to add 8 days here to get 7 but I don't know why.
            date.setDate(date.getDate() + 8);
            const dateString = date.toISOString().substr(0, 10);
            await _termine.newTermin(raid.id, dateString, termin.time);
        },
        toggleLocked: async function(context) {
            context.commit('toggleLocked');
            await _termine.putLocked(context.getters.termin.id, context.getters.isLocked);
            context.dispatch('wsSendRefresh');
        },
    },
    getters: {
        isActive: function(state) {
            return state.isActive;
        },
        isLocked: function(state) {
            return state.locked;
        },
        wsClient: function(state) {
            return state.wsClient;
        },
        wsOutput: function(state) {
            if (state.wsClient) {
                return state.wsClient.output;
            }
            return null;
        },
        elementForPosition: function(state) {
            return function(aufstellung, position) {
                return state.elements.find(e => e.aufstellung === aufstellung.id && e.pos === position);
            }
        },
        ersatzSpieler: function(state) {
            return state.ersatzspieler;
        },
        ersatzIds: function(state) {
            return state.ersatzspieler.map(p => p.id);
        },
        invitablePlayers: function(state) {
            return state.invitablePlayers;
        },
        anmeldungen: function(state) {
            return state.anmeldungen;
        },
        anmeldung: function(state) {
            return state.anmeldung;
        },
        aufstellungen: function(state) {
            return state.aufstellungen;
        },
        uploadActive: function(state) {
            return state.uploadActive;
        },
        isDialogOpen: function(state) {
            return function(dialog) {
                return state.openDialog === dialog;
            }
        }
    },
}