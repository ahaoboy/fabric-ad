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
