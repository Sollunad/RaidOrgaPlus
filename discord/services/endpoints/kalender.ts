import fetch from "../connector";

export async function getKalenderTermine(){
    return await fetch('kalender', 'get', {});
}