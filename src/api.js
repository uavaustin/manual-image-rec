const SERVER = 'http://localhost:5000';

let doHTTP = async (method, path) => {
    let resp = await fetch(SERVER + path);
    return await resp.json();
};

export let get = async (path) => {
    return await doHTTP('GET', path);
};

export default { get };