import fetch from "../connector";

export async function getAufstellungen(session, termin){
    return await fetch('aufstellungen', 'get', {termin}, session);
}

export async function getElements(session, aufstellung){
    return await fetch('aufstellungen/elements', 'get', {aufstellung}, session);
}