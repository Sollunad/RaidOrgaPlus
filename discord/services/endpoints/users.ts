import fetch from "../connector";

export async function login(key, id) {
    return await fetch('users/sessions', 'post', {key, id});
}