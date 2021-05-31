import fetch from "../connector";
import { Aufstellung } from "models/Aufstellung";
import { Encounter } from "models/Encounter";
import { element } from "models/Types";

export async function getAufstellungen(session, termin: number): Promise<(Aufstellung & Encounter)[]> {
    return await fetch('aufstellungen', 'get', {termin}, session);
}

export async function getElements(session, aufstellung: number): Promise<element[]> {
    return await fetch('aufstellungen/elements', 'get', {aufstellung}, session);
}