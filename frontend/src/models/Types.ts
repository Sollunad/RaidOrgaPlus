import Vue from 'vue';
import { Role } from '../../../models/Rolle';

export type VForm = Vue & { 
	validate: () => boolean,
	reset: () => void
};

export type aufstellungPick = {
	aufstellung: number
	position: number;
	user: {
		id: number;
		name: string;
		accname: string;
	};
	role: Role
	clss: {
		id: number;
		abbr: string;
	};
	idx: number;
}