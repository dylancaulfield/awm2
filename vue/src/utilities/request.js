import axios from "axios";
import userStore from "@/store/user"

export async function get(url, token = true) {

    const headers = {};
    if(userStore.state.authToken && token){
        headers["Authorization"] = `Token ${userStore.state.authToken}`
    }

    const response = await axios.get(url, {
        headers,
        withCredentials: true
    });
    return response.data;

}

export async function post(url, data, token = true) {

    const headers = {};
    if(userStore.state.authToken && token){
        headers["Authorization"] = `Token ${userStore.state.authToken}`
    }

    const response = await axios.post(
        url,
        data,
        {
            headers,
            withCredentials: true
        }
    )

    return response.data;

}