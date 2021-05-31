import fetch from "../connector";
import { Termin } from "models/Termin";
import { Spieler, SpielerTermin } from "models/Spieler";

export async function getTermine(session, raid: number): Promise<(Termin & SpielerTermin)[]> {
    return await fetch('termine', 'get', {raid}, session);
}

export async function getAnmeldungen(session, termin: number): Promise<(Spieler & SpielerTermin)[]> {
    return await fetch('termine/anmeldungenAll', 'get', {termin}, session);
}

export async function putAnmeldung(session, termin: number, type: number): Promise<any> {
    return await fetch('termine/anmeldungen', 'put', {termin, type}, session);
}