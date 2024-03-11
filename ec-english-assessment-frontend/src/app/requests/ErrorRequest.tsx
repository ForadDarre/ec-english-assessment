import { message } from "antd";

export const ErrorDefault = (error: any) => {
    if (error.response) {
        if (error.response.status === 401 || error.response.status === 403) {
            message.error({
                content: "You don't have access to this page.",
            });
        } else if (
            error.response.data &&
            typeof error.response.data === "string"
        ) {
            message.error({
                content: error.response.data.toString(),
            });
        } else {
            message.error({
                content:
                    "Server side error. Error code: " + error.response.status,
            });
        }
    } else {
        message.error({
            content: "Server side error.",
        });
    }
};
