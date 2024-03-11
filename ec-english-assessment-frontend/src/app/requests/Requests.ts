import axios from "axios";
import {
    addStudentEndpoint,
    editStudentEndpoint,
    getAllCoursesEndpoint,
    getAllStudentsEndpoint,
} from "./Endpoints";
import { AddStudentRequestDto, EditStudentRequestDto } from "../types/DTO";

export const GetAllStudentsRequest = async () => {
    let response = await axios.get(getAllStudentsEndpoint, {
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};

export const GetAllCoursesRequest = async () => {
    let response = await axios.get(getAllCoursesEndpoint, {
        headers: {
            Accept: "application/json",
        },
    });

    return response;
};

export const AddStudentRequest = async (
    addStudentRequest: AddStudentRequestDto
) => {
    let response = await axios.put(addStudentEndpoint, addStudentRequest, {
        headers: {
            Accept: "application/json",
        },
    });
    return response;
};

export const EditStudentRequest = async (
    editStudentRequest: EditStudentRequestDto
) => {
    let response = await axios.post(editStudentEndpoint, editStudentRequest, {
        headers: {
            Accept: "application/json",
        },
    });
    return response;
};
