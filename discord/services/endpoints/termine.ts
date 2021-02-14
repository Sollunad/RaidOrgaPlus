import fetch from "../connector";

export async function getTermine(session, raid) {
    return await con.fetch('termine', 'get', {raid}, session);
}

export async function getAnmeldungen(session, termin) {
    return await con.fetch('termine/anmeldungenAll', 'get', {termin}, session);
}

export async function putAnmeldung(session, termin, type) {
    return await con.fetch('termine/anmeldungen', 'put', {termin, type}, session);
}