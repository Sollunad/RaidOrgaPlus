module.exports = [
    {function: checkBuildVersion, path: '', method: 'get', authed: false},
];

const EXPECTED_BUILD = '2020_05_17';

async function checkBuildVersion(req, authentication) {
    const fe_build = req.query.build;
    if (fe_build && fe_build === EXPECTED_BUILD) {
        return 'Success';
    }
    return EXPECTED_BUILD;
}