import con from '../connector';

export default { login, invalidateSession };

async function login(key){
    return await con('users/sessions', 'post', {key});
}

async function invalidateSession(user) {
    return await con('users/sessions', 'delete', {}, user);
}