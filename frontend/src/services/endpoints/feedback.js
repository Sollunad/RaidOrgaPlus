import con from '../connector';

export default { feedback };

async function feedback(text, accname){
    return await con('feedback', 'post', {text, accname});
}