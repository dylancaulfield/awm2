import axios from "axios";
import userStore from "@/store/user"

export async function get(url) {

    const headers = {};
    if(userStore.state.authToken){
        headers["Authorization"] = `Token ${userStore.state.authToken}`
    }

    const response = await axios.get(url, {
        headers,
        withCredentials: true
    });
    return response.data;

}

export async function post(url, data) {

    const headers = {};
    if(userStore.state.authToken){
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