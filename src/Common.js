const API_URL = process.env.REACT_APP_API_URL + "/tasks/";

function getApiUrl(path) {
    const url = (API_URL + path + "/").replaceAll("//", "/").replaceAll(":/", "://");
    return url;
}

export {
    getApiUrl,
}
