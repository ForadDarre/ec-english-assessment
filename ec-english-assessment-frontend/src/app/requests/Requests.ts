import axios from "axios";
import { getAllStudentsEndpoint } from "./Endpoints";

export const GetAllStudentsRequest = async () => {
    let response = await axios.get(getAllStudentsEndpoint, {
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};
