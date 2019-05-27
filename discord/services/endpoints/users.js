import con from '../connector';

export default { login, invalidateSession };

//TODO: Backend Login-Funktion anpassen für Discord-Key
async function login(key){
    return await con('users/sessions', 'post', {key});
}

async function invalidateSession(user) {
    return await con('users/sessions', 'delete', {}, user);
}