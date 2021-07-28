import { Action, CommitOptions, DispatchOptions, Mutation } from "vuex";
import { Aufstellung } from "../../../../models/Aufstellung";
import { Encounter } from "../../../../models/Encounter";
import { terminDate } from "../../../../models/Types";
import { RootState } from "./RootState";

export interface AufstellungState {
	isActive: any;
	aufstellungen: (Aufstellung & Encounter)[];
	elements: any[];
	locked: boolean;
	anmeldungen: any[];
	anmeldung: any;
	wsClient: any;
	ersatzspieler: any[];
	invitablePlayers: any[];
	uploadActive: boolean;
	openDialog: any;
	raidName: string;
	terminDate: terminDate;
}

export interface AufstellungGetters {
	isActive: any;
	isLocked: boolean;
	wsClient: any;
	wsOutput: any;
	elementForPosition: any;
	dummyElement: any;
	isNameDoubled: (aufstellung: any, name: any) => boolean;
	ersatzSpieler: any[];
	ersatzIds: any[];
	invitablePlayers: any[];
	anmeldungen: any[];
	anmeldung: any;
	aufstellungen: (Aufstellung & Encounter)[];
	uploadActive: boolean;
	isDialogOpen: (dialog: any) => boolean;
	raidName: string;
	terminDate: terminDate;
}

export enum AufstellungMutations {
	SetActive = "SetActive",
	SetAufstellungen = "SetAufstellungen",
	SetElements = "SetElements",
	SetLocked = "SetLocked",
	SetAnmeldungen = "SetAnmeldungen",
	SetAnmeldung = "SetAnmeldung",
	StartWSClient = "StartWSClient",
	SetErsatzspieler = "SetErsatzspieler",
	SetInvitablePlayers = "SetInvitablePlayers",
	ToggleUpload = "ToggleUpload",
	StopUpload = "StopUpload",
	SetOpenDialog = "SetOpenDialog",
	ToggleLocked = "ToggleLocked",
	AddElement = "AddElement",
	SetRaidName = "SetRaidName",
	SetTerminDate = "SetTerminDate",
}

export enum AufstellungActions {
	LoadAufstellungen = "LoadAufstellungen",
	LoadAufstellungenPreview = "LoadAufstellungenPreview",
	ClearWS = "ClearWS",
	CloseWS = "CloseWS",
	UpdateErsatz = "UpdateErsatz",
	Anmelden = "Anmelden",
	Refresh = "Refresh",
	WsSendRefresh = "WsSendRefresh",
	ToggleUpload = "ToggleUpload",
	AddBoss = "AddBoss",
	DeleteBoss = "DeleteBoss",
	OpenDialog = "OpenDialog",
	CloseDialog = "CloseDialog",
	Archive = "Archive",
	Delete = "Delete",
	CreateNewTermin = "CreateNewTermin",
	ToggleLocked = "ToggleLocked",
	PickClass = "PickClass",
	ClearClass = "ClearClass",
	PickRole = "PickRole",
	ClearRole = "ClearRole",
	PickName = "PickName",
	ClearName = "ClearName"
}

export type AufstellungGettersDefinition = {
	[P in keyof AufstellungGetters]: (state: AufstellungState, getters: AufstellungGetters) => AufstellungGetters[P]
}

export type AufstellungMutationsDefinition = {
	[P in AufstellungMutations]: Mutation<AufstellungState>;
}

export type AufstellungActionsDefinition = {
	[P in AufstellungActions]: Action<AufstellungState, RootState>;
}

export interface BaseAufstellungMutationPayloadWithType {
	type: AufstellungMutations;
}

export interface AufstellungActionPayloadWithType {
	type: AufstellungActions;
}

export interface AufstellungCommit {
	(type: AufstellungMutations, payload?: unknown, options?: CommitOptions): void;
	<P extends BaseAufstellungMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

export interface AufstellungDispatch {
	(type: AufstellungActions, payload?: unknown, options?: DispatchOptions): Promise<unknown>;
	<P extends AufstellungActionPayloadWithType>(payloadWithType: P, options?: DispatchOptions): Promise<unknown>;
}