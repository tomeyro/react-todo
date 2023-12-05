const API_URL = "http://192.168.68.122:8000/tasks/"

function getApiUrl(path) {
    const url = (API_URL + path + "/").replaceAll("//", "/").replaceAll(":/", "://");
    console.log(url);
    return url;
}

export {
    getApiUrl,
}
