import fetch from "../connector";

export async function getRaids(session) {
    return await fetch('raids', 'get', {}, session);
}