import { http, HttpResponse } from "msw";
import {
    getAllCoursesEndpoint,
    getAllStudentsEndpoint,
} from "../../requests/Endpoints";

export const requestHandlers = [
    http.get(getAllStudentsEndpoint, async () => {
        const response: any = {
            data: [],
        };

        return HttpResponse.json(response.data);
    }),

    http.get(getAllCoursesEndpoint, async () => {
        const response: any = {
            data: [],
        };

        return HttpResponse.json(response.data);
    }),
];
