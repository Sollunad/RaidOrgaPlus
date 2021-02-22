import _termine from "../../services/endpoints/termine";
import _aufstellungen from "../../services/endpoints/aufstellungen";
import WSClient from "../../services/websocket";
import _raids from "../../services/endpoints/raids";
import _preview from "../../services/endpoints/preview";

export interface Aufstellung {
	isActive: any;
	aufstellungen: any;
	elements: any[];
	locked: boolean;
	anmeldungen: any[];
	anmeldung: any;
	wsClient: any;
	ersatzspieler: any[];
	invitablePlayers: any[];
	uploadActive: boolean;
	openDialog: any;
}

export default {
    state: {
        isActive: null,
        aufstellungen: null,
        elements: [] as any[],
        locked: false,
        anmeldungen: [] as any[],
        anmeldung: {},
        wsClient: null,
        ersatzspieler: [] as any[],
        invitablePlayers: [] as any[],
        uploadActive: false,
        openDialog: null,
    } as Aufstellung,
    mutations: {
        setActive: function (state: Aufstellung, isActive: any) {
            state.isActive = isActive;
        },
        setAufstellungen: function (state: Aufstellung, aufstellungen: any) {
            state.aufstellungen = aufstellungen;
        },
        setElements: function (state: Aufstellung, elements: any) {
            state.elements = elements;
        },
        setLocked: function (state: Aufstellung, locked: any) {
            state.locked = locked;
        },
        setAnmeldungen: function (state: Aufstellung, anmeldungen: any) {
            state.anmeldungen = anmeldungen;
        },
        setAnmeldung: function (state: Aufstellung, anmeldung: any) {
            state.anmeldung = anmeldung;
        },
        startWSClient: function (state: Aufstellung, termin: any) {
            state.wsClient = new WSClient(termin.id);
        },
        setErsatzspieler: function (state: Aufstellung, ersatzspieler: any) {
            state.ersatzspieler = ersatzspieler;
        },
        setInvitablePlayers: function (state: Aufstellung, invitablePlayers: any) {
            state.invitablePlayers = invitablePlayers;
        },
        toggleUpload: function (state: Aufstellung) {
            state.uploadActive = !state.uploadActive;
        },
        stopUpload: function(state: Aufstellung) {
            state.uploadActive = false;
        },
        setOpenDialog: function (state: Aufstellung, dialog: any) {
            state.openDialog = dialog;
        },
        toggleLocked: function (state: Aufstellung) {
            state.locked = !state.locked;
        },
        addElement(state: Aufstellung, element: any) {
            state.elements = state.elements.filter(e => e.aufstellung !== element.aufstellung || e.pos !== element.pos);
            state.elements.push(element);
        }
    },
    actions: {
        loadAufstellungen: async function (context: any) {
            const termin = context.getters.termin;
            const raid = context.getters.raid;
            context.commit('setAnmeldungen', []);
            context.commit('setAufstellungen', []);
            context.commit('stopUpload');
            context.commit('setActive', null);
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
        loadAufstellungenPreview: async function (context: any, terminId: any) {
            context.commit('setAufstellungen', await _preview.getAufstellungen(terminId));
            context.commit('setElements', await _preview.getElements(terminId));
            context.commit('setLocked', true);
            context.commit('setActive', true);
        },
        clearWS: function (context: any) {
            if (context.getters.wsClient) {
                context.getters.wsClient.output = null;
            }
        },
        closeWS: function (context: any) {
            if (context.getters.wsClient) {
                context.getters.wsClient.close();
            }
        },
        updateErsatz: async function (context: any, newValue: any[]) {
            const oldValue: any[] = context.getters.ersatzIds;
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

            const newErsatzspieler = context.getters.invitablePlayers.filter((p: any) => newValue.includes(p.id));
            context.commit('setErsatzspieler', newErsatzspieler);
        },
        anmelden: async function (context: any, type: any) {
            const user = context.getters.loggedInUser;
            const termin = context.getters.termin;
            const changedAnmeldung = context.getters.anmeldungen.find((a: any) => a.id === user.id);
            if (changedAnmeldung) changedAnmeldung.type = type;
            else context.getters.anmeldungen.push({id: user.id, name: user.name, type: type});
            await _termine.anmelden(termin.id, type);
            context.dispatch('wsSendRefresh');
        },
        refresh: async function (context: any) {
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
        wsSendRefresh: function (context: any) {
            if (context.getters.wsClient) {
                context.getters.wsClient.sendRefresh();
            }
        },
        toggleUpload: function (context: any) {
            context.commit('toggleUpload');
        },
        addBoss: async function (context: any, info: any) {
            const [boss, wing] = info;
            const termin = context.getters.termin;
            if (boss === 0) {
                context.commit('setAufstellungen', await _termine.addWing(termin.id, wing));
                context.commit('setElements', await _aufstellungen.getElements(termin.id));
            } else {
                context.commit('setAufstellungen', await _termine.addBoss(termin.id, boss));
                context.commit('setElements', await _aufstellungen.getElements(termin.id));
            }
            context.dispatch('wsSendRefresh')
        },
        deleteBoss: async function (context: any, aufstellung: any) {
            const termin = context.getters.termin;
            context.commit('setAufstellungen', await _aufstellungen.deleteBoss(aufstellung.id, termin.id));
            context.dispatch('wsSendRefresh');
        },
        openDialog: function (context: any, dialog: any) {
            context.commit('setOpenDialog', dialog);
        },
        closeDialog: function (context: any) {
            context.commit('setOpenDialog', null);
        },
        archive: async function (context: any, newTermin: any) {
            context.dispatch('closeDialog');
            if (newTermin) {
                context.dispatch('createNewTermin');
            }
            await _termine.archive(context.getters.termin.id);
            window.history.back();
        },
        delete: async function (context: any, newTermin: any) {
            context.dispatch('closeDialog');
            if (newTermin) {
                context.dispatch('createNewTermin');
            }
            await _termine.deleteTermin(context.getters.termin.id);
            window.history.back();
        },
        createNewTermin: async function (context: any) {
            const termin = context.getters.termin;
            const raid = context.getters.raid;
            const oldDate = termin.date.slice(4);
            const dmy = oldDate.split('.');
            const date = new Date(dmy[2], dmy[1] - 1, dmy[0]);
            // I have to add 8 days here to get 7 but I don't know why.
            date.setDate(date.getDate() + 8);
            const dateString = date.toISOString().substr(0, 10);
            await _termine.newTermin(raid.id, dateString, termin.time, termin.endtime);
        },
        toggleLocked: async function (context: any) {
            context.commit('toggleLocked');
            await _termine.putLocked(context.getters.termin.id, context.getters.isLocked);
            context.dispatch('wsSendRefresh');
        },
		/* eslint-disable-next line  @typescript-eslint/no-implicit-any */
        pickClass: async function (context: any, { aufstellung, position, clss }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.class = clss.abbr;
            context.commit('addElement', element);
            await _aufstellungen.setClass(aufstellung, position, clss.id);
            context.dispatch('wsSendRefresh');
        },
        clearClass: async function (context: any, { aufstellung, position }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.class = '';
            context.commit('addElement', element);
            await _aufstellungen.setClass(aufstellung, position, 0);
            context.dispatch('wsSendRefresh');
        },
        pickRole: async function (context: any, { aufstellung, position, role }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.role = role.abbr;
            context.commit('addElement', element);
            await _aufstellungen.setRole(aufstellung, position, role.id);
            context.dispatch('wsSendRefresh');
        },
        clearRole: async function (context: any, { aufstellung, position }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.role = '';
            context.commit('addElement', element);
            await _aufstellungen.setRole(aufstellung, position, 0);
            context.dispatch('wsSendRefresh');
        },
        pickName: async function (context: any, { aufstellung, position, user }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.id = user.id;
            element.name = user.name;
            element.accname = user.accname;
            context.commit('addElement', element);
            await _aufstellungen.setName(aufstellung, position, user.id);
            context.dispatch('wsSendRefresh');
        },
        clearName: async function (context: any, { aufstellung, position }: any) {
            let element = context.getters.elementForPosition(aufstellung, position);
            if (!element) {
                element = context.getters.dummyElement(aufstellung, position);
            }
            element.id = 0;
            element.name = '???';
            element.accname = '???';
            context.commit('addElement', element);
            await _aufstellungen.setName(aufstellung, position, 0);
            context.dispatch('wsSendRefresh');
        }
    },
    getters: {
        isActive: function (state: Aufstellung) {
            return state.isActive;
        },
        isLocked: function (state: Aufstellung) {
            return state.locked;
        },
        wsClient: function (state: Aufstellung) {
            return state.wsClient;
        },
        wsOutput: function (state: Aufstellung) {
            if (state.wsClient) {
                return state.wsClient.output;
            }
            return null;
        },
        elementForPosition: function (state: Aufstellung) {
            return function (aufstellung: any, position: any) {
                return state.elements.find(e => e.aufstellung === aufstellung && e.pos === position);
            }
        },
        dummyElement: function () {
            return function (aufstellung: any, position: any) {
                return {aufstellung, pos: position, class: '', role: '', name: '???', accname: '???', id: 0};
            }
        },
        isNameDoubled: function (state: Aufstellung) {
            return function (aufstellung: any, name: any) {
                return state.elements.filter(e => e.aufstellung === aufstellung.id && e.name === name).length > 1;
            }
        },
        ersatzSpieler: function (state: Aufstellung) {
            return state.ersatzspieler;
        },
        ersatzIds: function (state: Aufstellung) {
            return state.ersatzspieler.map(p => p.id);
        },
        invitablePlayers: function (state: Aufstellung) {
            return state.invitablePlayers;
        },
        anmeldungen: function (state: Aufstellung) {
            return state.anmeldungen;
        },
        anmeldung: function (state: Aufstellung) {
            return state.anmeldung;
        },
        aufstellungen: function (state: Aufstellung) {
            return state.aufstellungen;
        },
        uploadActive: function (state: Aufstellung) {
            return state.uploadActive;
        },
        isDialogOpen: function (state: Aufstellung) {
            return function (dialog: any) {
                return state.openDialog === dialog;
            }
        }
    },
}