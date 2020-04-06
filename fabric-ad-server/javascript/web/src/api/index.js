import axios from "./axios";

export function getSource(path) {
    let url = "/getSource";
    return axios.post(url, {
        src: path
    });
}

export function queryAllStus() {
    let url = "/queryAllStus";
    return axios.post(url);
}

export function addUser(uid, pwd) {
    console.log("axios addUser", uid, pwd);
    let url = "/addUser";
    return axios.post(url, {
        uid,
        pwd
    });
}

export function addRecord(uid, aid) {
    console.log("axios addRecord", uid, aid);

    let url = "/addRecord";
    return axios.post(url, {
        uid,
        aid
    });
}

export function getUser(uid) {
    console.log("axios getUser", uid);
    let url = "/getUser";
    return axios.post(url, {
        uid
    });
}
